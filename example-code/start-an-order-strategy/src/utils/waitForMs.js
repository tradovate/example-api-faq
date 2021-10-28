export async function waitForMs(ms) {
    return new Promise((res, _) => {
        setTimeout(res, ms)
    })
}