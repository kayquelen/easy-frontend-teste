import { NextApiRequest, NextApiResponse } from 'next'

interface HealthResponse {
  status: 'ok' | 'error'
  timestamp: string
  environment: string
  version: string
  uptime: number
  domain?: string
  url?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  try {
    const healthData: HealthResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      url: process.env.NEXT_PUBLIC_URL,
    }

    res.status(200).json(healthData)
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
    })
  }
}
