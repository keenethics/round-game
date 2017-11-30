import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => Object.assign(user, { status: 0, points: 0 }));
