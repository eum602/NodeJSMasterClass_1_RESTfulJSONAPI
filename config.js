/*
*
Create and export configuration variables
*
**/
//container for all the environments
const environments = {}

//Staging (default) environment
environments.staging={
    'httpPort':3000,
    'httpsPort':3001,
    'envName':'staging'
}

//production environment
environments.production={
    'httpPort':5000,
    'httpsPort':5001,
    'envName':'production'
}

//Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV)==='string' ? 
process.env.NODE_ENV.toLowerCase():''

//Check that the current environment  was passed  as a command-line  argument
const environmentToExport = typeof(environments[currentEnvironment]) ==='object' ?
environments[currentEnvironment]:environments.staging

//export the module
module.exports = environmentToExport