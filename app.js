var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var operands = buildSchema(`
  type Input {
      a: Int!
      b: Int!
      sum: Int
      subtract: Int
      multiply: Int
      division: Float
  }
  type Query {
    input(a: Int!, b: Int!): Input
  }
`);

class Input {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    };

    sum() {
        return this.a+this.b;
    };

    subtract() {
        return this.a - this.b;
    };

    multiply() {
        return this.a*this.b;
    };

    division() {
        if (this.b === 0) {
            return 0;
        }
        return this.a/this.b;
    }
};

const input = ({a,b}) => {
    return new Input(a, b)
};


var operations = {
    input: input
}

var app = express();

app.use('/operands', graphqlHTTP({
    schema: operands,
    rootValue: operations,
    graphiql: true,
  }));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');