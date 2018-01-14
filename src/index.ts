import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

function runDemo() {
  return createConnection().then(async (connection) => {
    console.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    await connection.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    console.log('Loaded users: ', users);

    console.log('Here you can setup and run express/koa/any other framework.');
    await connection.close();
  }).catch(error => console.log(error));
}

function test() {
  return createConnection().then(async (connection) => {
    let r = connection.getRepository(User);
    let user = await r.preload({
      id: 6,
      firstName: 'Linmu',
    });
    console.log('user: ', user);
    await connection.close();
  }).catch(err => console.log(err));
}

function __main() {
  runDemo().then(() => {
    test();
  });
}

__main();
