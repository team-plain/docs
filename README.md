# Plain Documentation

This is the documentation for [Plain](https://plain.com) and its API which you can find here:

**https://plain.com/docs**

They are built using [Mintlify](https://mintlify.com).

To run these locally you will need

- Node 18.x
- pnpm 8.x

To run the docs locally:

- Install all dependencies using `pnpm install`
- Run it using `pnpm run dev`

You can run linting with `pnpm lint`

There are some key language/style choices you should follow (and add to):

- Key features are not uppercase e.g. "Customer cards" vs "Customer Cards"
- URL is uppercase
- 'backend' not 'back-end'
- Be consistent in which words are used for different groups of people:
  - When refering to people who are helped via Plain use the name "customer"
  - When refering to people who use Plain to help other people use the name "user"
