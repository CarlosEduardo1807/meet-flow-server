import 'dotenv/config';
import { reqGet, reqPost } from '../utils/utils'

export class VideoSdkLiveService {

    static async createRoom(): Promise<any> {
        const headers = {
            "Authorization": process.env.VIDEO_SDK_LIVE_TOKEN,
            "Content-Type": "application/json",
        }
        const url = `https://api.videosdk.live/v2/rooms`;
        const req = await reqPost(url, {}, headers)
        return req
    }

    static async validateRoom(roomId: string): Promise<any> {
        const headers = {
            "Authorization": process.env.VIDEO_SDK_LIVE_TOKEN,
            "Content-Type": "application/json",
        }
        const Id = roomId;
        const url = `https://api.videosdk.live/v2/rooms/validate/${Id}`;
        const req = await reqGet(url, headers)
        return req
    }

    static async fecthRoom(roomId: string): Promise<any> {
        const headers = {
            "Authorization": process.env.VIDEO_SDK_LIVE_TOKEN,
            "Content-Type": "application/json",
        }
        const Id = roomId;
        const url = `https://api.videosdk.live/v2/rooms/${Id}`;
        const req = await reqGet(url, headers)
        return req

    }

    static async deactivate(roomId: string): Promise<any> {
        const headers = {
            "Authorization": process.env.VIDEO_SDK_LIVE_TOKEN,
            "Content-Type": "application/json",
        }
        const body = { "roomId": roomId }
        const url = `https://api.videosdk.live/v2/rooms`;
        const req = await reqPost(url, body, headers)
        return req
    }

}