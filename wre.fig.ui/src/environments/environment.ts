export const environment = {
  production: false,
  apiUrl:     '/api',    // same-origin via dev-server proxy --> no CORS preflight
  hubUrl:     'http://localhost:5100/hubs/fig',
  pageSize:   10,
  useMsalAuth:   false,             // flip to true when Azure app is ready
  azureClientId: '667f35ed-8642-4224-a438-bd2e0d55f993',  
  azureTenantId: '354ffbfb-e376-41b5-9059-522f3cdf73be'  
};
