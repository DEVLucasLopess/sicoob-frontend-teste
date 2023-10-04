import axios from "axios"
import { useCallback } from 'react'
export const api = axios.create({baseURL: 'http://localhost:3001'})

export const useHttp = () => {
    const get = useCallback(async ({ url }) => {
        console.log(url)
        return await api.get(url)
    }, [])
    return { get }
 }