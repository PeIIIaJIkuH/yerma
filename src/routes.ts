import {lazy} from 'react'
import {IRoute} from './types'

type PublicRoutes = 'auth'

type AdminRoutes = 'unverified'

type PrivateRoutes =
	| 'main'
	| 'almaMater'
	| 'news'
	| 'essays'
	| 'teachers'
	| 'alumni'
	| 'education'
	| 'career'
	| 'leisure'
	| 'tales'
	| 'gallery'
	| 'muz'
	| 'memory'
	| 'create'
	| 'search'

export const publicRoutes: Record<PublicRoutes, IRoute> = {
	auth: {
		path: '/auth',
		title: 'Авторизация',
		Component: lazy(() => import('./pages').then(({AuthPage}) => ({default: AuthPage}))),
	},
}

export const adminRoutes: Record<AdminRoutes, IRoute> = {
	unverified: {
		path: '/unverified',
		title: 'Посты на проверку',
		Component: lazy(() => import('./pages').then(({UnverifiedPostsPage}) => ({default: UnverifiedPostsPage}))),
	},
}

export const privateRoutes: Record<PrivateRoutes, IRoute> = {
	main: {
		path: '/',
		title: 'Главная',
		Component: lazy(() => import('./pages').then(({MainPage}) => ({default: MainPage}))),
	},
	almaMater: {
		path: '/alma-mater',
		title: 'Alma Mater',
		Component: lazy(() => import('./pages').then(({AlmaMaterPage}) => ({default: AlmaMaterPage}))),
	},
	news: {
		path: '/news',
		title: 'Новости',
		Component: lazy(() => import('./pages').then(({NewsPage}) => ({default: NewsPage}))),
	},
	essays: {
		path: '/essays',
		title: 'Эссе',
		Component: lazy(() => import('./pages').then(({EssaysPage}) => ({default: EssaysPage}))),
	},
	teachers: {
		path: '/teachers',
		title: 'Преподаватели',
		Component: lazy(() => import('./pages').then(({TeachersPage}) => ({default: TeachersPage}))),
	},
	alumni: {
		path: '/alumni',
		title: 'Выпускники',
		Component: lazy(() => import('./pages').then(({AlumniPage}) => ({default: AlumniPage}))),
	},
	education: {
		path: '/education',
		title: 'Образование',
		Component: lazy(() => import('./pages').then(({EducationPage}) => ({default: EducationPage}))),
	},
	career: {
		path: '/career',
		title: 'Карьера',
		Component: lazy(() => import('./pages').then(({CareerPage}) => ({default: CareerPage}))),
	},
	leisure: {
		path: '/leisure',
		title: 'Досуг',
		Component: lazy(() => import('./pages').then(({LeisurePage}) => ({default: LeisurePage}))),
	},
	tales: {
		path: '/tales',
		title: 'Студенческие байки',
		Component: lazy(() => import('./pages').then(({TalesPage}) => ({default: TalesPage}))),
	},
	gallery: {
		path: '/gallery',
		title: 'Галерея',
		Component: lazy(() => import('./pages').then(({GalleryPage}) => ({default: GalleryPage}))),
	},
	muz: {
		path: '/muz',
		title: '9 муз',
		Component: lazy(() => import('./pages').then(({MuzPage}) => ({default: MuzPage}))),
	},
	memory: {
		path: '/memory',
		title: 'Память',
		Component: lazy(() => import('./pages').then(({MemoryPage}) => ({default: MemoryPage}))),
	},
	create: {
		path: '/create',
		title: 'Добавить',
		Component: lazy(() => import('./pages').then(({CreatePage}) => ({default: CreatePage}))),
	},
	search: {
		path: '/search',
		title: 'Поиск',
		Component: lazy(() => import('./pages').then(({SearchPage}) => ({default: SearchPage}))),
	},
}
