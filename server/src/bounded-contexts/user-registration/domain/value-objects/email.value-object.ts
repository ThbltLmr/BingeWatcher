export class Email {
  value: string;
  constructor(value: string) {
    if (!value) {
      throw new Error('Email is required');
    }

    if (value.length > 500) {
      throw new Error('Email cannot be longer than 500 characters');
    }

    if (
      value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null
    ) {
      throw new Error('Email is invalid');
    }

    this.value = value;
  }
}
