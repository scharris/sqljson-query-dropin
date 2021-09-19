param (
  [Parameter(Mandatory = $true)][string]$jdbcProps,
  [Parameter(Mandatory = $true)][string]$dbType
)

$ErrorActionPreference = "Stop"
$scriptDir = "$PSScriptRoot"

mvn -f $PSScriptRoot/dbmd/pom.xml compile exec:java "-DjdbcProps=$jdbcProps" "-Ddb=$dbType"
npm run generate-relations-metadata
