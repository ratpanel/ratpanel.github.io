export default {
    async paths() {
        const resp = await (await fetch('https://panel.haozi.net/api/versions')).json()
        if (!resp.message || resp.message !== 'success') return []

        return resp.data.map((item: any) => {
            return {
                params: {
                    version: item.version,
                    type: item.type,
                    time: item.updated_at.replace('T', ' ').slice(0, 19)
                },
                content: item.description
            }
        })
    }
}