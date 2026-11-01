# EduPortal Adaptive Learning

A mathematics workspace for Classes 6 to 10. Teachers publish assignments with an optional worksheet PDF. Students open each assignment in three tabs: Learn, Solve, and Test. How many topics and questions they see depends on a rating that moves as they work.

## Run it

```bash
npm install
copy .env.example .env
npm run dev
```

The app is at [http://localhost:5173](http://localhost:5173). The API is at [http://localhost:5000](http://localhost:5000). Vite forwards `/api` to that server.

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the API and the Vite app together |
| `npm run server` | Starts only the API |
| `npm run dev:client` | Starts only the Vite app |
| `npm run build` | Builds the client |

## Environment

Create `.env` from `.env.example`. It is not committed.

| Variable | Purpose |
| --- | --- |
| `PORT` | API port. Defaults to `5000`. |
| `LLM_API_KEY` | Gemini API key used by the Learn tab. |
| `LLM_MODEL` | Model id. The app is set up for `gemini-3.6-flash`. |

Learn sends the assignment title and the student's question. Solve hints stay on the local worksheet answer. Restart the API after changing `.env`.

## Demo accounts

The login page fills these in with one click.

| Who | Roll number | Password |
| --- | --- | --- |
| Aarav Sharma, Class 6 | `240601` | `Aarav@2024` |
| Diya Patel, Class 7 | `230702` | `Diya@2023` |
| Rohan Verma, Class 8 | `220803` | `Rohan@2022` |
| Ananya Iyer, Class 9 | `210904` | `Ananya@2021` |
| Vihaan Reddy, Class 10 | `201005` | `Vihaan@2020` |
| Dr. Priya Sundaram, teacher | `20180940211` | `Teacher@2024` |

Students do not see their rating. The teacher sees it on a class page after opening that class.

## How an assignment works

- **Learn** asks Gemini about the assignment title.
- **Solve** lists practice topics. Each topic has an AI hint. Taking a hint lowers the rating once for that topic.
- **Test** is a 10-minute multiple-choice paper. Submit, or let the timer run out, and the assignment is marked complete. A right answer raises the rating. A wrong or unanswered one lowers it.

Easy questions are treated as rating 1000, medium as 1300, and hard as 1600. The change is `K × (score − expected)`, with `K` of 32 on a test answer and 16 on a hint. Beating a harder question raises the rating more. Missing an easier one drops it more.

A lower rating opens more topics and more test questions, mostly from the easier part of the bank. A higher rating opens fewer, mostly from the harder part. Each Class 6 and Class 8 chapter bank has 20 topics and 20 questions. The new rating is stored in `server/data/ratings.json`.

## What is saved on the server

- Teacher-added assignments live in `server/data/addedModules.json`.
- Uploaded PDFs live in `server/pdfs/`. A refresh keeps them.
- Class 8 chapters 1 to 5 also have generated worksheet PDFs when no upload exists.

## License

MIT. See [LICENSE](LICENSE).
