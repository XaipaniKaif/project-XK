from vkpymusic import Service
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def fetch_tracks_by_text(search, count):
    service = Service.parse_config()
    tracks = service.search_songs_by_text(search, int(count))
    tracks_info = [
        {
            "title": track.title,
            "artist": track.artist,
            "duration": track.duration,
            "track_id": track.track_id,
            "owner_id": track.owner_id,
            "url": track.url
        }
        for track in tracks
    ]
    print(tracks_info)

def fetch_tracks_by_userid(search, count):
    service = Service.parse_config()
    tracks = service.get_songs_by_userid(search, int(count))
    tracks_info = [
        {
            "title": track.title,
            "artist": track.artist,
            "duration": track.duration,
            "track_id": track.track_id,
            "owner_id": track.owner_id,
            "url": track.url
        }
        for track in tracks
    ]
    print(tracks_info)

def fetch_playlists_by_text(search):
    service = Service.parse_config()
    playlists = service.search_playlists_by_text(search, 5)
    playlist_info = [
        {
            "title": playlist.title,
            "photo": playlist.photo,
            "playlist_id": playlist.playlist_id,
            "description": playlist.description,
            "count": playlist.count,
            "access_key": playlist.access_key,
            "owner_id": playlist.owner_id
        }
        for playlist in playlists
    ]
    print(playlist_info)

def fetch_tracks_by_playlist_id(search, user_id, access_key):
    service = Service.parse_config()
    tracks = service.get_songs_by_playlist_id(user_id=int(user_id), playlist_id=int(search), access_key=access_key, count=50)
    tracks_info = [
        {
            "title": track.title,
            "artist": track.artist,
            "duration": track.duration,
            "track_id": track.track_id,
            "owner_id": track.owner_id,
            "url": track.url
        }
        for track in tracks
    ]
    print(tracks_info)

search = sys.argv[1]
params = sys.argv[2]
count = sys.argv[3]
other = sys.argv[4] if len(sys.argv) > 4 else None

if params == 'track':
    fetch_tracks_by_text(search, count)
elif params == 'user':
    fetch_tracks_by_userid(search, count)
elif params == 'playlist':
    fetch_playlists_by_text(search)
elif params == 'getTrackPlaylist':
    fetch_tracks_by_playlist_id(search, count, other)
else:
    print('hiy')
