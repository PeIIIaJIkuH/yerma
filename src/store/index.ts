import {AppState} from './appState'
import {AuthState} from './authState'
import {PostsState} from './postsState'
import {UsersState} from './usersState'

const authState = new AuthState()
const appState = new AppState()
const postsState = new PostsState()
const usersState = new UsersState()

export {authState, appState, postsState, usersState}
