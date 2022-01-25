import { listAuthorizedEvents } from './EventButtonList';

describe('EventButtonList', () => {
  it('lists button to display from enrollment acl', () => {
    const acl = {
      create: false,
      destroy: true,
      index: false,
      notify: true,
      refuse: true,
      request_changes: false,
      submit: true,
      show: true,
      update: true,
      validate: false,
    };

    expect(listAuthorizedEvents(acl)).toMatchSnapshot();
  });
});
