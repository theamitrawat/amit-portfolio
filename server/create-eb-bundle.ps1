$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceRoot = $PSScriptRoot
$archivePath = Join-Path $sourceRoot '..\portfolio-api.zip'
$includePaths = @(
  'Procfile',
  'package.json',
  'package-lock.json',
  'index.js',
  'routes',
  'middleware',
  'utils',
  '.ebextensions'
)

if (Test-Path -LiteralPath $archivePath) {
  Remove-Item -LiteralPath $archivePath
}

$archive = [System.IO.Compression.ZipFile]::Open(
  $archivePath,
  [System.IO.Compression.ZipArchiveMode]::Create
)

try {
  foreach ($includePath in $includePaths) {
    $path = Join-Path $sourceRoot $includePath
    $files = if (Test-Path -LiteralPath $path -PathType Container) {
      Get-ChildItem -LiteralPath $path -Recurse -File -Force
    } else {
      Get-Item -LiteralPath $path -Force
    }

    foreach ($file in $files) {
      $entryName = $file.FullName.Substring($sourceRoot.TrimEnd('\').Length + 1).Replace('\', '/')
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $archive,
        $file.FullName,
        $entryName,
        [System.IO.Compression.CompressionLevel]::Optimal
      ) | Out-Null
    }
  }
} finally {
  $archive.Dispose()
}

Write-Output "Created Elastic Beanstalk source bundle: $archivePath"
