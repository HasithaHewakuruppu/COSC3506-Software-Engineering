/*
  This object will be the source of truth for our environment variables

  If adding DATABASE_URL as an environment variable, for example, add DATABASE_URL as a key
  and process.env.DATABASE_URL as the value.

  import the env variable below and access the variable like
  env.DATABASE_URL (sample in the createPost handler)

*/
export const env = {
  DATABASE_URL: process.env.DATABASE_URL,

  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,

  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,

  DISCORD_ID: process.env.DISCORD_ID,
  DISCORD_SECRET: process.env.DISCORD_SECRET,
}

export function checkAllEnvironmentVariablesPresent() {
  const missingEnvVariables = Object.entries(env)
    .filter(([_envKey, envValue]) => !envValue)
    .map(([envKey, _envValue]) => envKey)

  if (missingEnvVariables.length > 0) {
    throw new Error(
      `You have some missing env variables :( \n
        Please add the following env variables to .env.local file: ${missingEnvVariables.join(
          ', '
        )}
      `
    )
  }
}

checkAllEnvironmentVariablesPresent()
