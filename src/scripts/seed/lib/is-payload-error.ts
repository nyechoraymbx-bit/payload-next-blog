type PayloadErrorLike = {
    name:string
    status: number
    data?: {
        collection: string
        errors?: {
            message?:string    //? optional
            path?: string
        }[]
    }
}
export function isPayloadError(error: unknown): error is PayloadErrorLike{
    return(
        !!error && 
        typeof error ==="object" &&
        "name" in error &&
        "status" in error &&
        "data" in error
    )
}