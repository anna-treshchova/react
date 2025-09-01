import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

export const getAllPosts = createAsyncThunk(    //   createAsyncThunk приймає два аргументи:
    'posts/getAllPosts',                        //      1. базовий префікс для action types
    async (_, { rejectWithValue } ) => {        //      2. async-функцію, яка виконує асинхронну логіку
        try{
            const res = await fetch(`${BASE_URL}?_limit=10`)
            if (!res.ok) {
                throw new Error('Failed to fetch posts')
            }
            return await res.json()
        } catch(err){
            return rejectWithValue(err.message);
        }
    }
)                                                                /*———————————————————————————————————————————————————————

                                                                     createAsyncThunk створить три action creators:

                                                                        1. getAllPosts.pending = {
                                                                              type: 'posts/getAllPosts/pending',
                                                                              payload: undefined
                                                                           }

                                                                       2. getAllPosts.fulfilled = {
                                                                             type: 'posts/getAllPosts/fulfilled',
                                                                             payload: data
                                                                           }

                                                                       3. getAllPosts.rejected = {
                                                                            type: 'posts/getAllPosts/rejected',
                                                                            payload: err.message
                                                                          }

                                                               ———————————————————————————————————————————————————————*/
export const getPostById = createAsyncThunk(
    'posts/getPostById',
    async (id, { rejectWithValue } ) => {
        try{
            const res = await fetch(`${BASE_URL}/${id}`)

            if (!res.ok) {
                throw new Error('Post not found')
            }
            return await res.json()
        } catch(err){
            return rejectWithValue(err.message);
        }
    }
)

export const getComments = createAsyncThunk(
    'posts/getComments',
    async (id, { rejectWithValue } ) => {
        try{
            const res = await fetch(`${BASE_URL}/${id}/comments?_limit=4`)
            if (!res.ok) {
                throw new Error('Failed to fetch comments for this post')
            }
            return await res.json()
        } catch(err){
            return rejectWithValue(err.message);
        }
    }
)


/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

                                                     Redux Thunk
                                                    ‾‾‾‾‾‾‾‾‾‾‾‾‾
        Це middleware, яка автоматично підключена в Redux Toolkit й дозволяє працювати з асинхронними діями


  ◦ Дозволяє передавати у dispatch не лише plain object (звичайний JS об'єкт), а й функцію (thunk)

  ◦ Thunk-функція — це огортка для асинхронної логіки (наприклад: fetch, таймери, тощо)

     Для зручності вона створюється через createAsyncThunk

     ТОБТО thunk можна написати вручну, без createAsyncThunk, але тоді потрібно буде самостійно створювати actions
     та диспатчити pending/fulfilled/rejected



                                        ЩО САМЕ АВТОМАТИЗУЄ createAsyncThunk:
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 1. Створює thunk-функцію, яку можна передати у dispatch

 2. Автоматично диспатчить три стандартні action-и:

       ◦ pending  —> коли async-функція почала виконання

       ◦ fulfilled  —> коли проміс успішно виконався

       ◦ rejected  —> коли проміс завершився помилкою або через rejectWithValue

 3. Обробляє payload:

       ◦ повернення з async-функції  —> стає action.payload у fulfilled

       ◦ виклик rejectWithValue(value)  —> стає action.payload у rejected

 4. Надає thunkAPI: автоматично передає dispatch, getState, rejectWithValue

 5. Скорочує boilerplate: не потрібно вручну формувати action-и і диспатчити їх у try/catch


 ОСНОВНА АВТОМАТИЗАЦІЯ: це тригеринг action-ів і передача payload/помилок




                        createAsyncThunk ПРИЙМАЄ ДВА ОСНОВНИХ АРГУМЕНТИ (третій — опціональний)
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

         createAsyncThunk(
           typePrefix,       —>  1.  префікс для action type
           payloadCreator,   —>  2.  функція, що виконує async-логіку
         )


 1. typePrefix (рядок) — це префікс для action type (наприклад: posts/getAllPosts)

        Потім createAsyncThunk автоматично додасть до нього суфікси й створить три стандартні action-типи:

            ◦ posts/getAllPosts/pending — діспачиться, коли async-функція почала виконання

            ◦ posts/getAllPosts/fulfilled — коли виконалась успішно

            ◦ posts/getAllPosts/rejected — коли сталася помилка

        Суфікси (pending, fulfilled, rejected) ― це частина вбудованої логіки createAsyncThunk

        Оскільки всередині використовується проміс, createAsyncThunk автоматично відстежує його стан
        і формує відповідний action із потрібним суфіксом


 2. payloadCreator (функція) — це async-функція, яка виконує асинхронну логіку (fetch)

        Назва payloadCreator у createAsyncThunk походить від того, що ця функція створює
        payload для action, який буде диспатчитися

                               async (arg, thunkAPI) => { ... }


        ЦЯ ФУНКЦІЯ ПРИЙМАЄ ДВА АРГУМЕНТИ:

           2.1.  arg — те, що ми передали в dispatch(getAllPosts(1))  —>  1

           2.2  thunkAPI — спеціальний об’єкт із допоміжними методами: dispatch, getState, rejectWithValue та інші
                                                                       ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                 Якщо в блоці catch просто повернути err.message —> return(err.message), createAsyncThunk
                 автоматично сформує action rejected, і наша помилка опиниться в полі action.error.message

                            {
                              type: 'posts/getAllPosts/rejected',
                              payload: undefined
                              error: { message: 'Failed to fetch posts' }
                            }

                 ◦ Без rejectWithValue  —>  помилка йде в action.error.message

                 ◦ З rejectWithValue  —>  помилка (текст обо об’єкт) зберігається в action.payload —>  й тоді action
                   виглядатиме так:

                            {
                              type: 'posts/getAllPosts/rejected',
                              payload: 'Failed to fetch posts',
                              error: {message: 'Rejected'}     —>  стандартний текст
                            }


——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/