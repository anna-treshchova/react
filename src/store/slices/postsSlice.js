import { createSlice } from '@reduxjs/toolkit';

import {
    getAllPosts,
    getPostById,
    getComments
} from '../thunks/postsThunk'

const initialState = {
    posts: [],
    post: { id: null, title: '', body: '' },
    comments: [],
    loadingPosts: false,
    loadingPost: false,
    loadingComments: false,
    PostsError: '',
    PostError: '',
    CommentsError: ''
};

const postsSlice = createSlice ({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.loadingPosts = true;
                state.postsError = '';
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loadingPosts = false;
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loadingPosts = false;
                state.postsError = action.payload || action.error.message;
            })

            .addCase(getPostById.pending, (state) => {
                state.loadingPost = true;
                state.postError = '';
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                state.loadingPost = false;
                state.post = action.payload;
            })
            .addCase(getPostById.rejected, (state, action) => {
                state.loadingPost = false;
                state.postError = action.payload || action.error.message;
            })

            .addCase(getComments.pending, (state) => {
                state.loadingComments = true;
                state.commentsError = '';
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.loadingComments = false;
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loadingComments = false;
                state.commentsError = action.payload || action.error.message;
            })

    }
})

export default postsSlice.reducer;



/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

    1. dispatch(getAllPosts()) — в компоненті диспачимо thunk (асинхронну функцію)
       ↓

    2. React Thunk middleware перехоплює action з thunk й починає його виконання
       ↓

    3. Формує pending action і диспатчить його, а після завершення промісу диспатчить fulfilled або rejected action
       ↓

    4. extraReducer обробляє action і оновлює state


————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 ФУНКЦІЯ — ЦЕ СПЕЦІАЛЬНИЙ ОБ’ЄКТ, ЯКИЙ СКЛАДАЄТЬСЯ З ДВОХ ЧАСТИН:

    1. Тіло функції — сам код, який виконується при виклику
    2. Об’єктні властивості — сюди можна додавати свої поля чи методи


      │ function hello() {
      │   console.log('Hello!');
      │ }
      │
      │ hello.extra = 'I am an additional property';
      │
      │ hello();                    // викличе функцію
      │ console.log(hello.extra);   // 'I am an additional property'


 Але якщо зробити console.log(hello)  —> у консолі ми побачимо лише тіло функції:

      │ ƒ hello() {
      │   console.log('Hello!');
      │ }

 Додаткова властивість не відобразиться, бо console.log показує саме тіло функції

 Щоб побачити всі властивості функції як об’єкта  —> треба використати console.dir(hello)
 Тоді в консолі відобразяться внутрішні властивості функції як спеціального об’єкта, серед яких й буде extra

      │ ƒ hello()
      │ arguments: null
      │ caller: null
      │ length: 0
      │ name: "hello"
      │ prototype: {constructor: ƒ}
  —>  │ extra: 'I am an additional property'
      │ [[FunctionLocation]]: ...
      │ [[Scopes]]: ...


 ЦЕ ІЛЮСТРУЄ ЩО ФУНКЦІЯ ОДНОЧАСНО Є КОДОМ І ОБ’ЄКТОМ З ДОДАТКОВИМИ ВЛАСТИВОСТЯМИ


‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾       ↓ ↓ ↓       ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

           createAsyncThunk використовує те, що ФУНКЦІЯ В JS Є ОБ’ЄКТОМ, до якого можна додавати властивості


 У результаті виклику createAsyncThunk ми отримуємо спеціальну об'єкт-функцію, яки складається з двох частин:

    1. Thunk-функція – асинхронна функція, яку ми викликаємо у компоненті через dispatch(getAllPosts()),
        щоб отримати дані з API


    2. Action creators – три додаткові властивості цієї функції, які створюють action-об’єкти для різних етапів запиту:

        2.1  getAllPosts.pending  —> action creator (функція), який повертає action з type: 'posts/getAllPosts/pending'

        2.2  getAllPosts.fulfilled  —> повертає action з type: 'posts/getAllPosts/fulfilled'

        2.3  getAllPosts.rejected  —> повертає action з type: 'posts/getAllPosts/rejected'


        createAsyncThunk також створює ще одну властивість:

        getAllPosts.typePrefix  —> рядок 'posts/getAllPosts', який слугує базовим префіксом для генерації action типів



 ВИГЛЯДАЄ ЦЕ ТАК: якщо зробити console.dir(getAllPosts), то ми отримаємо:

      │ ƒ actionCreator() { ... }
      │
      │ getAllPosts.typePrefix:  "posts/getAllPosts"
      │ getAllPosts.pending: ƒ actionCreator(...args)   —> функціЇ action creators, які повертають actions (об'єкти)
      │ getAllPosts.fulfilled: ƒ actionCreator(...args)
      │ getAllPosts.rejected: ƒ actionCreator(...args)



 ПІДСУМОК: getAllPosts — це не просто функція, а об’єкт-функція (thunk + action creators), створена createAsyncThunk


‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾       ↓ ↓ ↓       ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

 createAsyncThunk повертає:

     ◦ thunk-функцію (getAllPosts)

     ◦ action creators (getAllPosts.pending, getAllPosts.fulfilled, getAllPosts.rejected) як властивості цієї функції


  Щоб використовувати ці action creators у extraReducers, ми:

     1. Імпортуємо thunk у потрібний slice:  import { getAllPosts } from '../thunks/postsThunk'

     2. І звертаємося до них як до методів об’єкта getAllPosts (який одночасно є функцією і об’єктом з властивостями)


              │ extraReducers: (builder) => {
              │     builder
              │         .addCase(getAllPosts.pending, (state) => {   —>  getAllPosts.pending — action creator
              │             state.loadingPosts = true;
              │             state.error = '';
              │         })
              │ }


     3. Як працює builder.addCase(actionCreator, reducer):

          3.1  Коли в extraReducers надходить action з thunk-функції (createAsyncThunk), Redux починає перевірку, чи є
               для нього відповідний редюсер

          3.1  Він викликає переданий в builder.addCase action creator, який повертає об’єкт action ({ type, payload })

          3.2  Потім порівнює action.type отриманого action із action.type, який повернув action creator

          3.3  Якщо збіг є  —> виконується редюсер, переданий другим аргументом у addCase


————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

   ◦ В postsSlice немає поля reducers, бо ми не створюємо власні редюсери, які генерують свої action creators
     (типу setPosts, addPost тощо)

   ◦ У нас вся логіка зосереджена в extraReducers, які обробляють thunk-функції (getAllPosts, getPostById, getComments),
     в яких як властивості зберігаються action creators (pending, fulfilled, rejected)

   ◦ Тому:

       • postsSlice.actions буде порожнім об’єктом {}, бо reducers не визначені  —> немає що експортувати

       • Достатньо експортувати reducer з цього слайсу, щоб підключити його до store:  export default postsSlice.reducer


————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    dispatch(thunk function) завжди повертає проміс, і твій код може продовжувати виконуватися далі.


 reducers у extraReducers синхронні — вони працюють так само, як і звичайні редюсери — одразу оновлюють state після
 приходу action

     ◦ reducers —> для локальних action-ів цього slice (вони створюються автоматично разом зі slice)

     ◦ extraReducers —> для зовнішніх action-ів, які згенерував createAsyncThunk (pending / fulfilled / rejected)

     ◦ І в reducers, і в extraReducers редюсери синхронні, різниця тільки в джерелі action


————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

extraReducers: (builder) => {
    builder
        .addCase(getAllPosts.pending, (state) => {
            state.loadingPosts = true;
            state.error = '';
        })
}
                                              ——————————————————————————————————————————————————————————————————————————

                                                  getAllPosts.pending — це action creator, який створює action виду

                                                        │ {
                                                        │   type: 'posts/getAll/pending'
                                                        │ }

                                                  ТОБТО:

                                                      ◦ getAllPosts.pending —> це функція (action creator)

                                                      ◦ getAllPosts.pending.type —> це рядок 'posts/getAll/pending'


                                                   КОЛИ МИ ПИШЕМО:

                                                        │ builder.addCase(getAllPosts.pending, (state) => {
                                                        │   state.loadingPosts = true;
                                                        │ });


                                                    Redux Toolkit під капотом робить перевірку:

                                                        │ if (getAllPosts.pending.type === action.type) {
                                                        │   reducer(state)
                                                        │ }

                                              ——————————————————————————————————————————————————————————————————————————

   ◦ extraReducers — це функція

   ◦ builder — це об’єкт, який Redux Toolkit автоматично передає як аргумент в функцію extraReducer

         Об'єкт builder дає API з трьома методами для опису логіки редюсерів, замість switch/case


         УСІ МЕТОДИ ПРАЦЮЮТЬ ЗА ОДНІЄЮ ЛОГІКОЮ: Кожен метод приймає два аргументи:

              ПЕРШИЙ: action creator або matcher (для addDefaultCase його немає)

              ДРУГИЙ: reducer (state, action) => { ... }  —> який виконується тільки, якщо перший аргумент СПРАЦЮВАВ



                                                   МЕТОДИ builder
                                                  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

   1. builder.addCase(actionCreator, reducer) — обробляє конкретний action
         —>  Коли action.type === actionCreator.type  —> виконується редюсер


   2. builder.addMatcher(matcher, reducer) — дозволяє одним редюсером обробити кілька action-ів, що відповідають певній
      умові


       ПЕРШИЙ АРГУМЕНТ:  matcher — це функція, яка приймає action і повертає true або false
       ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
           Якщо повертає true —> редюсер (другий аргумент у addMatcher) спрацьовує


            У Redux Toolkit є готові ХЕЛПЕРИ-МАТРЧЕРИ, які можна імпортувати й використовувати:
            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                  1. isPending(getPosts, getComments, ...)
                        —> поверне true, якщо action.type === getPosts.pending.type або getComment.pending.type

                          │ builder.addMatcher(
                          │   isPending(getPosts, getComments),    —> matcher (перший аргумент)
                          │   (state) => {                         —> reducer (другий аргумент)
                          │      state.loading = true;
                          │      state.error = '';
                          │   }
                          │ );


                  2. isFulfilled(getPosts, getComments, ...)
                        —> поверне true, якщо action.type === getPosts.fulfilled.type або getComment.fulfilled.type

                  3. isRejected(getPosts, getComment, ...) — аналогічно до попоередніх


                  4. isRejectedWithValue()  —> поверне true, якщо action завершився помилкою через rejectWithValue

                          │ builder.addMatcher(
                          │   isRejectedWithValue(),
                          │   (state, action) => {
                          │     state.loading = false;
                          │     state.error = action.payload;  —> наше повідомлення про помилку
                          │   }
                          │ );


                  5. isAnyOf(getPosts.fulfilled, getComment.reejected, getPost)
                         —> поверне true, якщо action.type збігається з будь-яким із зазначених

                     Використовується коли нам потрібно обробити кілька action-ів, які мають різні суфікси,
                     але редюсер для них однаковий



           ДРУГИЙ АРГУМЕНТ:  reducer(state, action) — редюсер, який виконується, якщо matcher повернув true
           ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾


   3. builder.addDefaultCase(reducer) — метод у extraReducers, який задає редюсер за замовчуванням

        Якщо жоден addCase або addMatcher не спрацював для конкретного action  —> виконується addDefaultCase



 ПОРЯДОК ВИКОНАННЯ:
 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
   1. Спершу спрацьовують точні addCase (для конкретного action.type)

   2. Потім — усі addMatcher, які збіглися

   3. Наприкінці — addDefaultCase (якщо є)


——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/