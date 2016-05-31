# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Questions

- `GET /api/questions`
- `POST /api/questions`
- `GET /api/questions/:id`
- `PATCH /api/questions/:id`
- `DELETE /api/questions/:id`

### Surveys

- `GET /api/surveys`
- `POST /api/surveys`
- `GET /api/surveys/:id`
- `PATCH /api/surveys/:id`
- `DELETE /api/surveys/:id`
- `GET /api/surveys/:id/questions`
  - index of all questions for a survey
  - accepts pagination params (if I get there)
