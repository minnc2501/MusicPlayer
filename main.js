const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('.progress_bar-info_text-name')
const artist  = $('.progress_bar-info_text-artist')
const img = $('.progress_bar-info_img img')
const audio = $('#audio')
const togglePlay = $('.btn-play')
const player = $('.player')
const playing = $$('.btn-play ion-icon')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-shuffle')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const volumeBtn = $('.btn-volume')
const volume = $('.volume')
const audio_muted = $('#audio')
const battatloa = $('.battatloa')
const pause = $('.pause')
const search = $('.icon-search')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMuted: false,
    songs: [
        {
            no: '01',
            name: 'Cô người tình',
            artist: 'Không tác giả',
            time: '0:53',
            path: './assets/music/CoNguoiTinh.mp3',
            image: './assets/img/coNguoiTinh.png'
        },
        {   no: '02',   
            name: 'Mây Lang Thang',
            artist: 'Tùng Tea',
            time: '3:19',
            path: './assets/music/MayLangThang.mp3',
            image: './assets/img/MayLangThang.png'

        },
        {   no: '03',
            name: 'Normal No More',
            artist: 'Không tác giả',
            time: '3:17',
            path: './assets/music/NormalNoMore.mp3',
            image: './assets/img/NormalNoMore.png'

        },
        {   no: '04',
            name: 'Thương Thầm',
            artist: 'Không tác giả',
            time: '1:14',
            path: './assets/music/ThuongTham.mp3',
            image: './assets/img/ThuongTham.png'

        },
        {   
            no: '05',
            name: 'Ái nộ',
            artist: 'Masew x Khoi Vu',
            time: '2:42',
            path: './assets/music/AiNo.mp3',
            image: './assets/img/AiNo.png'

        },
        {   no: '06',
            name: 'Your Smile',
            artist: 'Không tác giả',
            time: '3:22',
            path: './assets/music/YourSmile.mp3',
            image: './assets/img/YourSmile.png'

        },
        {   no: '07',
            name: 'Anh đợi em nha',
            artist: 'Không tác giả',
            time: '6:02',
            path: './assets/music/AnhDoiEmNha.mp3',
            image: './assets/img/anhDoiEmNha.png'

        },
        {   no: '08',
            name: 'Hồi Ức',
            artist: 'Không tác giả',
            time: '3:12',
            path: './assets/music/HoiUc.mp3',
            image: './assets/img/HoiUc.png'

        },
        {   no: '09',
            name: 'Body Back',
            artist: 'Không tác giả',
            time: '4:03',
            path: './assets/music/BodyBack.mp3',
            image: './assets/img/BodyBack.png'

        },
        {   no: '10',
            name: 'Ai cũng cần một bờ vai',
            artist: 'Không tác giả',
            time: '6:02',
            path: './assets/music/AiCungCanMotBoVai.mp3',
            image: './assets/img/ACCMBV.png'
        },

    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <ul class="top_track-nav_list ${index === this.currentIndex ? 'song_active' : ''}" data-index="${index}">
                <li class="top_track-nav_item ">
                    <p>
                        <span>${song.no}</span>
                        <span class="hide-on-mobile-tablet">U</span>
                        <span><ion-icon name="heart-outline" class="hide-on-mobile-tablet"></ion-icon></span>
                    </p>
                    <p>${song.name}</p>
                    <p>${song.artist}</p>
                    <p class="hide-on-mobile-tablet">12,345</p>
                    <p>${song.time}</p>
                    <p class="option">
                        <ion-icon name="share-social-outline" class="hide-on-mobile-tablet"></ion-icon>
                        <ion-icon name="chatbubble-ellipses-outline" class="hide-on-mobile-tablet"></ion-icon>
                        <span class="daubacham"><ion-icon name="ellipsis-horizontal-outline"></ion-icon></span>
                    </p>
                </li>
            </ul>
                `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvent: function() {
        // Xử lý khi click nút play
        togglePlay.onclick = function() {
            if(app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Khi song được play 
        audio.onplay = function() {
            app.isPlaying = true
            player.classList.add('playing')
            pause.classList.remove('playing')
        }

        // Khi song bị pause
        audio.onpause = function() {
            app.isPlaying = false
            player.classList.remove('playing')
            pause.classList.add('playing')
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        
        // Xử lý Khi tua song 
        progress.onchange = function(e) {
            audio.currentTime = (e.target.value * audio.duration) / 100
        }

        //Khi next song
        nextBtn.onclick = function() {
            if(app.isRandom) {
                app.playRandomSong()
            } else {
                app.nextSong()
            }
            audio.play()
            app.render()

        }
        // Khi prev Song
        prevBtn.onclick = function() {
            if(app.isRandom) {
                app.playRandomSong()
            } else {
                app.prevSong()
            }
            audio.play()
            app.render()
        }

        // Xử lý bật tắt random song
        randomBtn.onclick = function() {
            app.isRandom = !app.isRandom
            randomBtn.classList.toggle('control_active', app.isRandom)
        }

        // Xử lý bật tắt repeat
        repeatBtn.onclick = function() {
            app.isRepeat = !app.isRepeat
            repeatBtn.classList.toggle('control_active', app.isRepeat)
        }

        // Xử lý next song khi audio ended
        audio.onended = function() {
            if (app.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Lắng nghe khi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.top_track-nav_list:not(.song_active)')
            if ( songNode || e.target.closest('.top_track-nav_list:not(.option)')) {

            // Xử lý khi click vào song
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
                }
                
            }
        }  
        // Xử lý loa
        volume.onmouseup = function (e) {
        volume.onchange = function(e) {
                audio.volume = e.target.value
            }
        }
        // Xử lý bật tắt loa
        volumeBtn.onclick = function() {
            if(!app.isMuted) {
                audio.muted = true
                battatloa.classList.remove('playing')
                app.isMuted = !app.isMuted
            } else {
                audio.muted = false
                battatloa.classList.add('playing')
                app.isMuted = !app.isMuted
            }

        }

        // Xử lý khi clikc vào icon search
        search.onclick = function() {
            $('.header_lookup-input').classList.toggle('enabled')
        }
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        artist.textContent = this.currentSong.artist
        audio.src = this.currentSong.path
        img.src = this.currentSong.image

    },
    // Khi next song
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    // Khi prev song
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0 ) {
            this.currentIndex = this.songs.length -1
        }
        this.loadCurrentSong()
    },
    // Khi ramdom songs
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex == this.currentIndex)
            
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    
    


    start: function() {
        //Định nghĩa các thuộc tính cho oject
        this.defineProperties()

        // lắng nghe/ xử lý các sự kiện (DOM events)
        this.handleEvent()

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Render playlist
        this.render()

        
    }
    

}
app.start()

const hearted = $$('.playlist p span ion-icon')
hearted[0].classList.add('hearted')

for (var i = 0; i < hearted.length; i++) {
    hearted[i].onclick = function() {
        this.classList.toggle('hearted');
    };
}

console.log()







