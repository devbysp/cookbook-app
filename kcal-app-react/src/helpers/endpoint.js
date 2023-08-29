import configuration from '../endpoints-config.json';

const resolvedConfig = resolveConfig();

function resolveConfig() {
  const config = { ...configuration };
  config.urls.envBaseUrl = getEnvBaseUrl(configuration);
  Object.keys(config.urls)
    .forEach((entry) => {
      const url = config.urls[entry];
      config.urls[entry] = replacePlaceHolders(url, { ...config.urls, ...config.servers });
    });
  Object.keys(config.endpoints)
    .forEach((entry) => {
      config.endpoints[entry] = replacePlaceHolders(config.endpoints[entry], config.urls);
    });
  return config;
}

function replacePlaceHolders(rawValue, dictionary) {
  const pattern = /\${(.+?)}/g;
  let value = rawValue;
  while (pattern.test(value)) {
    value = value.replace(pattern, (_, name) => {
      if (dictionary && dictionary[name]) {
        return dictionary[name];
      }
      throw Error(`Cannot resolve endpoint variable '${name}'`);
    });
  }
  return value;
}

function getEnvBaseUrl(config) {
  if (!config.environments) {
    throw Error('No running environment is defined');
  }
  for (let index = 0; index < config.environments.length; ++index) {
    const environment = config.environments[index];
    if (isEnvironmentMatch(environment)) {
      return environment.urls.envBaseUrl;
    }
  }
  return config.urls.envBaseUrl; // default value
}

function isEnvironmentMatch(environment) {
  if (environment.when) {
    if (environment.when.serverNameMatch) {
      if (window && window.location.host.match(environment.when.serverNameMatch)) {
        return true;
      }
    }
  }
  return false;
}

export function getEndpoint(key) {
  const { endpoints } = resolvedConfig;

  if (!(key in endpoints)) {
    throw Error(`Endpoint key ${key} is not defined!`);
  }
  return endpoints[key];
}
