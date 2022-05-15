import {FC, LazyExoticComponent} from 'react'

export interface IRoute {
	path: string
	title: string
	Component: LazyExoticComponent<FC>
}

export interface ILogin {
	email: string
	password: string
}

export interface ICreate {
	title: string
	author: string
	category: CreatePagePostCategoryEnum
	description: string
}

export interface IUser {
	uuid: string
	email: string
	created_at: string
	updated_at: string
	first_name?: string
	last_name?: string
	middle_name?: string
}

export interface IUserGroup {
	uuid: string
	name: string
	created_at: string
	updated_at: string
}

export enum PostCategoryEnum {
	NEWS = 'NEWS',
	POST = 'POST',
	TALE = 'TALE',
	ESSAY = 'ESSAY',
	EDUCATION = 'EDUCATION',
	CAREER = 'CAREER',
	LEISURE = 'LEISURE',
	GALLERY = 'GALLERY',
	MUSE = 'MUSE',
	TEACHERS = 'TEACHERS',
	ALUMNI = 'ALUMNI',
	MEMORY = 'MEMORY',
}

export enum CreatePagePostCategoryEnum {
	TALE = 'TALE',
	ESSAY = 'ESSAY',
	EDUCATION = 'EDUCATION',
	CAREER = 'CAREER',
	LEISURE = 'LEISURE',
	GALLERY = 'GALLERY',
}

export const PostCategoryLabels: Record<PostCategoryEnum, string> = {
	NEWS: 'Новости',
	POST: 'Пост',
	TALE: 'Байки',
	ESSAY: 'Эссе',
	EDUCATION: 'Образование',
	CAREER: 'Карьера',
	LEISURE: 'Досуг',
	GALLERY: 'Галлерея',
	MUSE: 'Музыка',
	TEACHERS: 'Преподаватели',
	ALUMNI: 'Выпускники',
	MEMORY: 'Память',
}

export interface IPost {
	uuid: string
	created_at: string
	updated_at: string
	author: string
	category: PostCategoryEnum[]
	name: string
	description: string
	images: IPostImage[]
}

export interface IPostImage {
	uuid: string
	created_at: string
	updated_at: string
	image: string
}

export interface IToken {
	access: string
	refresh: string
}
