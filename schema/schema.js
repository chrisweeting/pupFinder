const graphql = require("graphql");
const { _ } =require("lodash");
const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLSchema 
} = graphql;

//test data

const pups = [
  {
    id: "1001",
    name: "Maui",
    breed: "Labrador Retriever",
    age: 1,
    status: "Available",
    title: "Meet Maui!",
    description: "Meet Maui! Our handsome, black and white Labrador/Spaniel mix! Maui is a 42 lb, 19 month old boy. He has a sweet and loving face, and is searching for his forever home! Maui will do best with an experienced dog owner who has the time to teach him the ways of the world. He is highly intelligent and needs an owner to match his physical energy and brainpower. Maui is a friendly boy who would do well in a home with other dogs and children 12yo and above but has not been introduced to a cat. He is a confident boy with a medium/high energy level and will do best in a home with a fenced yard. His ideal home will be able to provide him with a clear routine and well structured life. He likes to play outside, lay in your lap or go for a good car ride.Maui is crate and house trained. He is almost leash trained and will need some more time and effort to master this skill. Maui is an intelligent boy who looks forward to continue to learn some more advanced commands with his new owner. Maui is a beautiful boy with a smiley face. He would make an excellent addition to any family that can provide him with a loving and playful home. Mauis adoption fee is $450. That includes the cost of spaying, up to date vaccinations, foster care, rescue, and transport fees. To get the ball rolling, head over to our Adoption Application and submit your application today. A Dog Star representative will contact you within 24 hours. To help speed up the process contact your vet and give them permission to speak with us. If you do not get a response within 24 hours of submitting your application, please check your spam folder.",
    size: "Medium",
    color: "White",
    gender: "Male",
    userId: "2001",
    fee: 0.00
  },
  {
    id: "1002",
    name: "Zach",
    breed: "German Shepherd",
    age: 1,
    status: "Available",
    title: "Meet Zach",
    description: "Zach is one of the sweetest guys you will ever meet. He is about 2 years old and is a perfect size at around 40 lbs. He came to us from South Carolina and he was intially very timid. He is quickly coming out of his shell and is getting more confident and friendly by the day. Zach is exceptional around all other dogs and takes cues from them incredibly well. He is submissive and non threatening and other dogs like him instantly. He is also good with all people as long as they don't approach him too quickly. He will just avoid you until he is comfortable. We are looking for someone who is quiet, patient and calm to help with his confidence and to show him all the great things the world has to offer and he will blossom. We woulld love to find him a home with another dog would since that is very helpful for his confidence. He LOVES to be outside and he has great manners in the home. Once he feels comfortable you will see his adorable playful side come out. He also loves children and seems soothed by their innocent nature. Zach is 99% housebroken as long as you are on top of it. He will need a consistent routine and a lot of positive reinforcement to complete his training. Sudden movements and loud noises scare him so a quieter home is essential. If you feel like you are the right family for Zach, please fill out an application. We are currently only doing adoptions within CT at this time. Thank you!",
    size: "Medium",
    color: "Black",
    gender: "Male",
    userId: "2002",
    fee: 325.00
  },
];

const users = [
  {
    id: "2001",
    name: "Barry",
    type: "Individual",
    description: "n/a",
    city: "Waterbury",
    state: "CT",
  },
  {
    id: "2002",
    name: "Bloomfield Animal Shelter",
    type: "Organization",
    description: "Animal shelter established in 1950",
    city: "Bloomfield",
    state: "CT",
  },

];

const PupType = new GraphQLObjectType({
  name: "Pup",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    breed: { type: GraphQLString },
    age: { type: GraphQLInt },
    status: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    size: { type: GraphQLString },
    color: { type: GraphQLString },
    gender: { type: GraphQLString },
    fee: { type: GraphQLFloat },
    user: { 
      type: UserType,
      resolve(parent, args) {
        return _.find(users, { id: parent.userId });
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    pups: {
      type: new GraphQLList(PupType),
      resolve(parent, args) {
        return _.filter(pups, { userId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    pup: {
      type: PupType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(pups, {id: args.id});
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(users, {id: args.id});
      }
    },
    pups: {
      type: new GraphQLList(PupType),
      resolve(parent, args) {
        return pups;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});