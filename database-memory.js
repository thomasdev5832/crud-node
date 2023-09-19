import { randomUUID } from "node:crypto";

export class DatabaseMemory{
    #videos = new Map()

    create(video) {
        // UUID = Random Universal Unique Id
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }

    list(search) {
        // convert to array
        return Array.from(this.#videos.entries())
            .map((videoArray) => {
                const id = videoArray[0]
                const data = videoArray[1]
            
                return {
                    id,
                    ...data,
                }
            })
            .filter(video => {
                // Query params
                if(search) {
                    return video.title.includes(search)
                }
                return true
            })
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}