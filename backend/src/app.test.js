import { beforeEach, expect, test } from 'bun:test'

import app from './app.js'
import controllers from './controllers/controller.js'

const send = async (method, path, body) => {
  const res = await app.request(`/api/cards${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body && JSON.stringify(body),
  })
  return { status: res.status, body: await res.json() }
}

beforeEach(() => controllers.reset())

test('creates and lists cards with increasing ids', async () => {
  await send('POST', '', { city: 'provo', state: 'ut' })
  const { status, body } = await send('POST', '', { city: 'boise', state: 'ID' })
  expect(status).toBe(200)
  expect(body.map(({ id, city }) => [id, city])).toEqual([[1, 'provo'], [2, 'boise']])
  expect((await send('GET', '')).body).toHaveLength(2)
})

test('update keeps fields that are left empty', async () => {
  await send('POST', '', { city: 'provo', state: 'ut' })
  const { body } = await send('PUT', '/1', { city: 'ogden', state: '' })
  expect(body[0]).toMatchObject({ id: 1, city: 'ogden', state: 'ut' })
})

test('update of an unknown card is a 404', async () => {
  expect((await send('PUT', '/9', { city: 'ogden' })).status).toBe(404)
})

test('delete removes only the matching card', async () => {
  await send('POST', '', { city: 'provo', state: 'ut' })
  await send('POST', '', { city: 'boise', state: 'ID' })
  expect((await send('DELETE', '/1')).body.map((card) => card.id)).toEqual([2])
  // An unknown id used to splice(-1, 1) and drop the last card.
  expect((await send('DELETE', '/42')).body.map((card) => card.id)).toEqual([2])
})
