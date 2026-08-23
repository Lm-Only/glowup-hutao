type RequestOpts = {
    method?: 'GET'
};

export default async function request(url: string, opts: RequestOpts = {}): Promise<string> {
    const response = await fetch(url, {
        method: opts.method ?? 'GET'
    });

    return await response.text();
}