
const messageDataUrl = 'data:image/png;base64,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'
const API_URL = 'https://transcribr2-api.herokuapp.com'
// const API_URL = 'https://transcribr2-api-staging.herokuapp.com'
// const API_URL = 'http://localhost:3000'

const socket = io(API_URL)

function joinUserChannel () {
  chrome.storage.sync.get(['appState'], (res) => {
    try {
      if (!res.appState || !res.appState.user) throw new Error('not authenticated')
      socket.on('notification', notification => chrome.notifications.create({ message: notification.message, type: 'basic', iconUrl: messageDataUrl, title: 'Transcribr' }))
      socket.emit('joinUserChannel', res.appState.token)
    } catch (error) {
      console.error(error)
    }
  })
}
function leaveUserChannel () {
  chrome.storage.sync.get(['appState'], (res) => {
    try {
      socket.emit('leaveUserChannel', res.appState.token)
      chrome.storage.sync.clear()
      chrome.runtime.sendMessage({ name: 'refreshAppState' })
    } catch (error) {
      console.error(error)
    }
  })
}

joinUserChannel()

chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    if (request.name === 'createYoutubeClip') {
      createYoutubeClip(request.url, request.appState, sendResponse)
    }
    if (request.name === 'login') {
      login(request)
    }
    if (request.name === 'logout') {
      logout()
    }
  })

const createYoutubeClip = async (url, appState, sendResponse) => {
  try {
    const res = await fetch(API_URL + '/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: appState.token
      },
      body: JSON.stringify({
        url
      })
    })

    if (!res.ok) throw new Error('Coundn\'t get youtube clip')

    chrome.notifications.create({ message: 'Clip upload started!', type: 'basic', iconUrl: messageDataUrl, title: 'Transcribr' })
  } catch (error) {
    console.error(error)
    chrome.notifications.create({ message: 'Coudn\'t add clip', type: 'basic', iconUrl: messageDataUrl, title: 'Transcribr' })
  }
  await chrome.storage.sync.set({ appState: { ...appState, youtubeUploading: false } })
  chrome.runtime.sendMessage({ name: 'refreshAppState' })
}

const login = async ({ email, password }) => {
  try {
    let res = await fetch(API_URL + '/users/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ email, password }) // body data type must match "Content-Type" header
    })

    res = await res.json() // parses JSON response into native JavaScript objects
    await chrome.storage.sync.set({ appState: { user: res.user, token: 'Bearer ' + res.token } })
    chrome.runtime.sendMessage({ name: 'refreshAppState' })
    chrome.notifications.create({ message: 'Logged In!', type: 'basic', iconUrl: messageDataUrl, title: 'Transcribr' })
    joinUserChannel()
  } catch (error) {
    console.error(error)
    chrome.notifications.create({ message: 'Wrong email or password :(', type: 'basic', iconUrl: messageDataUrl, title: 'Transcribr' })
  }
}

const logout = async () => {
  leaveUserChannel()
}
