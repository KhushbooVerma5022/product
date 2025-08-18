import React from 'react'

export const buildAPIUrls = (endpoint) => {
    const url = import.meta.env.VITE_API_URL;
  return url+endpoint;
}

export default buildAPIUrls