# scan_project.ps1
# Generates:
# - tree.txt (ASCII)
# - project_scan.txt (concat of text files under src/ and public/)

$ErrorActionPreference = "Stop"
$base = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $base

$treeOut = "tree.txt"
$scanOut = "project_scan.txt"

# Extensions we want to include (lowercase, with dot)
$exts = @(
  ".html",".css",".js",".astro",".ts",".tsx",".json",
  ".scss",".sass",".less",".md",".mdx",".yaml",".yml",
  ".env",".mjs",".cjs",".txt"
)

# 1) TREE (ASCII)
cmd /c "chcp 437 >nul & tree /f /a > `"$treeOut`""

# 2) SCAN
$roots = @("src","public")

$header = @(
  "Project scan started on $(Get-Date)",
  "Base folder: $base",
  "Scanned roots: $($roots -join ' ')",
  "Allowed extensions: $($exts -join ' ')",
  "=======================================",
  ""
)
$header | Set-Content -Path $scanOut -Encoding UTF8

foreach ($r in $roots) {
  if (-not (Test-Path $r)) {
    "(WARN) Folder not found: $r`n" | Add-Content -Path $scanOut -Encoding UTF8
    continue
  }

  "########################################" | Add-Content $scanOut -Encoding UTF8
  "ROOT: $r" | Add-Content $scanOut -Encoding UTF8
  "########################################`n" | Add-Content $scanOut -Encoding UTF8

  Get-ChildItem $r -Recurse -File | Where-Object {
    $exts -contains $_.Extension.ToLower()
  } | ForEach-Object {
    $rel = $_.FullName.Substring($base.Length).TrimStart("\")
    "========================================" | Add-Content $scanOut -Encoding UTF8
    "FILE: $rel" | Add-Content $scanOut -Encoding UTF8
    "========================================`n" | Add-Content $scanOut -Encoding UTF8

    # Print file content
    Get-Content $_.FullName -Raw | Add-Content $scanOut -Encoding UTF8
    "`n`n" | Add-Content $scanOut -Encoding UTF8
  }
}

Write-Host "Done."
Write-Host "- $treeOut"
Write-Host "- $scanOut"
