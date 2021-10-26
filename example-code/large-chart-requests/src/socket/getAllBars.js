export async function getAllBars({socket, array, chartBody, closestTimestamp = new Date().toJSON(), asFarAsTimestamp, renderer = null }) {
    let result = array
    
    let unsubscribe = await socket.subscribe({
        url: 'md/getChart',
        body: { 
            ...chartBody,
            timeRange: { closestTimestamp, asFarAsTimestamp }
        },
        subscription: async chart => {  

            if(!chart.eoh) {
                chart.bars.forEach(({timestamp, open, high, low, close}) => result.push({ x: new Date(timestamp), y: [open, high, low, close] }))
            } else {
                await unsubscribe()

                result.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()).reverse()

                const oldestInSet = new Date(result[result.length - 1].x).toJSON()

                console.log(closestTimestamp)
                console.log(oldestInSet)

                if(oldestInSet !== asFarAsTimestamp && oldestInSet !== closestTimestamp) {
                    // console.log(result)
                    unsubscribe = await getAllBars({
                        socket, array: result, chartBody, asFarAsTimestamp, closestTimestamp: oldestInSet, renderer
                    })
                } else {
                    await unsubscribe()
                    console.log(result)
                    if(renderer) {
                        renderer()
                    }
                }
            }
        }
    })

    return result
}