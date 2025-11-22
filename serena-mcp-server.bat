@echo off
set PATH=%PATH%;C:\Users\Daniel Flichtentrei\.local\bin
uvx --from git+https://github.com/oraios/serena serena start-mcp-server %*