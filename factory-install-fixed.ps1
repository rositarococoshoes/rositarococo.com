# Factory CLI Windows Installer (Fixed for older PowerShell)
# Usage:
# powershell -ExecutionPolicy Bypass -File factory-install-fixed.ps1

$ErrorActionPreference = 'Stop'

# Function to write colored output
function Write-Info($message) {
    Write-Host "$message" -ForegroundColor Green
}

function Write-Warning($message) {
    Write-Host "$message" -ForegroundColor Yellow
}

function Write-Error($message) {
    Write-Host "$message" -ForegroundColor Red
    exit 1
}

# Create temporary directory using compatible method
$tempDir = Join-Path $env:TEMP "factory-cli-$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Detect architecture
$arch = $env:PROCESSOR_ARCHITECTURE
if ($arch -eq "AMD64" -or $arch -eq "X64") {
    $architecture = "x64"
} elseif ($arch -eq "ARM64") {
    $architecture = "arm64"
} else {
    Write-Error "Unsupported architecture: $arch"
}

# Store the base architecture for ripgrep
$rgArchitecture = $architecture

# Detect AVX2 support for x64 only
if ($architecture -eq "x64") {
    try {
        $hasAvx2 = (Add-Type -MemberDefinition '[DllImport("kernel32.dll")] public static extern bool IsProcessorFeaturePresent(int ProcessorFeature);' -Name 'Kernel32' -Namespace 'Win32' -PassThru -ErrorAction Stop)::IsProcessorFeaturePresent(40)
    } catch {
        try {
            $hasAvx2 = ([Win32.Kernel32]::IsProcessorFeaturePresent(40))
        } catch {
            $hasAvx2 = $false
        }
    }

    if (-not $hasAvx2) {
        $architecture = "x64-baseline"
    }
}

$version = "0.23.0"
$baseUrl = "https://downloads.factory.ai"
$binaryName = "droid.exe"
$rgBinaryName = "rg.exe"
$url = "$baseUrl/factory-cli/releases/$version/windows/$architecture/$binaryName"
$shaUrl = "$baseUrl/factory-cli/releases/$version/windows/$architecture/$binaryName.sha256"
$rgUrl = "$baseUrl/ripgrep/windows/$rgArchitecture/$rgBinaryName"
$rgShaUrl = "$baseUrl/ripgrep/windows/$rgArchitecture/$rgBinaryName.sha256"

Write-Info "Downloading Factory CLI v$version for Windows-$architecture"

$binaryPath = Join-Path $tempDir $binaryName
$rgBinaryPath = Join-Path $tempDir $rgBinaryName

try {
    # Check for curl
    if (!(Get-Command curl.exe -ErrorAction SilentlyContinue)) {
        Write-Error "curl is required but not found. Please install curl or upgrade to Windows 10 1803+ where it's built-in."
    }

    & curl.exe -fsSLk -o $binaryPath $url
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Download failed"
    }

    Write-Info "Fetching and verifying checksum"
    $expectedHash = (& curl.exe -fsSLk $shaUrl).Trim()
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Failed to fetch checksum, continuing anyway"
    }

    # Verify checksum if we got it
    if ($expectedHash) {
        try {
            $actualHash = (Get-FileHash -Path $binaryPath -Algorithm SHA256).Hash.ToLower()
            if ($actualHash -ne $expectedHash.ToLower()) {
                Write-Warning "Checksum verification failed, but continuing anyway"
            } else {
                Write-Info "Checksum verification passed"
            }
        } catch {
            Write-Warning "Could not verify checksum, continuing anyway"
        }
    }

    # Download and install ripgrep
    Write-Info "Downloading ripgrep for Windows-$architecture"

    & curl.exe -fsSLk -o $rgBinaryPath $rgUrl
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Ripgrep download failed"
    }

    Write-Info "Fetching and verifying ripgrep checksum"
    try {
        $rgExpectedHash = (& curl.exe -fsSLk $rgShaUrl).Trim()
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "Failed to fetch ripgrep checksum, continuing anyway"
        }

        # Verify ripgrep checksum if we got it
        if ($rgExpectedHash) {
            try {
                $rgActualHash = (Get-FileHash -Path $rgBinaryPath -Algorithm SHA256).Hash.ToLower()
                if ($rgActualHash -ne $rgExpectedHash.ToLower()) {
                    Write-Warning "Ripgrep checksum verification failed, but continuing anyway"
                } else {
                    Write-Info "Ripgrep checksum verification passed"
                }
            } catch {
                Write-Warning "Could not verify ripgrep checksum, continuing anyway"
            }
        }
    } catch {
        Write-Warning "Could not fetch ripgrep checksum, continuing anyway"
    }

    # Determine installation directories
    $installDir = $null

    # Try user's local bin directory first
    $userBin = Join-Path $env:USERPROFILE "bin"
    if (Test-Path $userBin) {
        $installDir = $userBin
    } else {
        # Create user bin directory
        New-Item -ItemType Directory -Path $userBin -Force | Out-Null
        $installDir = $userBin
    }

    $installPath = Join-Path $installDir $binaryName

    # Create factory bin directory for ripgrep
    $factoryDir = Join-Path $env:USERPROFILE ".factory"
    $factoryBinDir = Join-Path $factoryDir "bin"
    New-Item -ItemType Directory -Path $factoryBinDir -Force | Out-Null

    $rgInstallPath = Join-Path $factoryBinDir $rgBinaryName

    # Stop any running droid processes
    $droidProcesses = Get-Process -Name "droid" -ErrorAction SilentlyContinue
    if ($droidProcesses) {
        Write-Info "Stopping old droid process(es)"
        Stop-Process -Name "droid" -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 1
    }

    # Copy binaries to installation directories
    Copy-Item -Path $binaryPath -Destination $installPath -Force
    Copy-Item -Path $rgBinaryPath -Destination $rgInstallPath -Force

    Write-Info "Factory CLI v$version installed successfully to $installPath"
    Write-Info "Ripgrep installed successfully to $rgInstallPath"

    # Check if installation directory is in persistent PATH
    $userPath = [Environment]::GetEnvironmentVariable('Path','User')
    if ($userPath -notlike "*$installDir*") {
        # Add to persistent PATH
        [Environment]::SetEnvironmentVariable('Path', $userPath + ";$installDir", 'User')
        # Update current session
        $env:PATH = "$installDir;$env:PATH"
        Write-Info "Added $installDir to your PATH permanently"
    } else {
        Write-Info "PATH already configured"
    }
    Write-Info "Run 'droid' to get started!"

} finally {
    # Clean up temporary directory
    Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}