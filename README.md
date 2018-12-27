# Create-systems

This is a program to create json documents and SQL documents that can be put into a put into a database.
it can be used to create multiple systems.

## Installation

built for Node.js

This program relies on packages from NPM

these packages are [Faker](https://github.com/marak/Faker.js/) and [UUID](https://github.com/kelektiv/node-uuid)

1. clone this respitory.
1. navigate to the path where you cloned this to.
1. run `npm install`.
1. configuring the project (look configuring below).
1. usage (look usage below).

## Configuring

currently you can only configure a limited amount of settings these can be seen in root conf.js

1. configure how many systems you want in the file conf.js.
1. if a max number is below or equal to the number of the minimum then the minimum will be created everytime.

## Usage

you can run the progam by calling Index.js in the root folder of the project.

1. set your command prompt to the root folder of the project.
1. run the command `node index.js` or `node .`.
1. the program will now create a folder called out in the root folder.
1. creating a json and sql file within that folder.
1. with a random amount of systems or static amount based on the configuration
# create-systems
