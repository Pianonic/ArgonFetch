from fastapi import FastAPI, HTTPException
import uvicorn

from enums.audio_content_type import ContentType
from models.music_information import MusicInformation
from models.playlist_information import PlaylistInformation
from platform_handlers import content_type_identifyer, music_fetcher, platform_identifyer

app = FastAPI(title="ArgonFetch API", version="0.0.1")

@app.get("/api/identify/is-song", response_model=bool)
async def identify_content(url: str):
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")

    platform = await platform_identifyer.identify(url)
    content_type = await content_type_identifyer.identify(url, platform)

    if content_type is ContentType.NOT_SUPPORTED:
        raise HTTPException(status_code=400, detail="URL is not supported")

    return ContentType.is_song(content_type)

@app.get("/api/fetch/song", response_model=MusicInformation)
async def get_link_info(url: str):
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")

    platform = await platform_identifyer.identify(url)
    content_type = await content_type_identifyer.identify(url, platform)

    if content_type is ContentType.NOT_SUPPORTED:
        raise HTTPException(status_code=400, detail="URL is not supported")

    if not ContentType.is_song(content_type):
        raise HTTPException(status_code=400, detail="Playlists are not supported")

    return await music_fetcher.fetch_song(url)

@app.get("/api/fetch/playlist", response_model=PlaylistInformation)
async def get_link_info(url: str):
    if not url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    platform = await platform_identifyer.identify(url)
    content_type = await content_type_identifyer.identify(url, platform)

    if content_type is ContentType.NOT_SUPPORTED:
        raise HTTPException(status_code=400, detail="URL is not supported")

    if ContentType.is_song(content_type):
        raise HTTPException(status_code=400, detail="Songs are not supported")
    
    return await music_fetcher.fetch_playlist(url)

@app.get("/api/download/song", response_model=MusicInformation)
async def get_link_info(url: str):

    if not url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    return await music_fetcher.fetch_song(url)

@app.get("/api/download/playlist", response_model=MusicInformation)
async def get_link_info(url: str):

    if not url:
        raise HTTPException(status_code=400, detail="URL is required")
    
    return await music_fetcher.fetch_song(url)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)