import osUtils from 'os-utils'
import os, { platform } from 'os'
import fs from 'fs'

const POLLING_INTERVAL = 500

export const polling = () => {
    setInterval(async () => {
        const cpuModel = os.cpus()[0].model
        const cpuUsage = await getCpuUsage()
        const ramUsage = getRamUsage()
        const totalRam = os.totalmem()
        const storageData = getStorageData()
        // console.log({ cpuModel, cpuUsage, ramUsage, totalRam, storageData });
    }, POLLING_INTERVAL)
}


const getCpuUsage = () => {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve)
    })
}

const getRamUsage = () => {
    return 1 - osUtils.freememPercentage()
}

const getStorageData = () => {
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C:\\' : '/')
    const total = stats.bsize * stats.blocks
    const free = stats.bsize * stats.bfree

    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - (free / total)
    }
}