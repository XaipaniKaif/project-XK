

interface ResultSeachSteam  {
    total: number
    items: [
        {
            type: string,
            name: string,
            id: number,
            tiny_image: string,
            metascore: string,
            streamInVideos: boolean,

        }
    ]

}

interface DetailsGame {
    success: boolean
    data: DataGame
}

interface DataGame {
    type: 'game' | 'dlc'
    name: string
    steam_appid: number
    required_age: number
    is_free: boolean
    dlc: number[]
    detailed_description: string
    achievements: {
        total: number
        highlighted: [
            {
                name: string
                path: string
            }
        ]
    }
    about_the_game: string
    short_description: string
    supported_languages: string
    reviews: string
    header_image: string
    capsule_image: string
    capsule_imagev5: string
    website: string
    price_overview: { 
        currency: string
        initial: number
        final: number
        discount_percent: number
        initial_formatted: string
        final_formatted: string
    }
    pc_requirements: {
        minimum: string
        recommended: string
    }
    mac_requirements: {
        minimum: string
        recommended: string
    }
    linux_requirements: {
        minimum: string
        recommended: string
    }
    developers: string[]
    publishers: string[]
    packages: number[]
    package_group: object[]
    platforms: {
        windows: boolean
        mac: boolean
        linux: boolean
    }
    metacritic: {
        score: number
        url: string
    }
    categories: [
        {
            id: number
            description: string
        }
    ]
    genres: [
        {
            id: string
            description: string
        }
    ]
    screenshots: [
        {
            id: number
            path_thumbnail: string
            path_full: string
        }
    ]
    movies: [
        {
            id: number
            name: string
            thumbnail: string
            webm: {
                '480': string
                max: string
            }
            highlight: boolean
        }
    ]
    release_date: {
        coming_soon: boolean
        date: string
    }
    support_info: {
        url: string
        email:string
    }
    background: string,
    background_raw: string,
    content_description: {
        ids: string[]
        notes: string
    }
    ratings: {
        kgrb: [Object],
        dejus: [Object],
        cadpa: [Object],
        steam_germany: [Object]
    }
}
