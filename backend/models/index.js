const Freelancer = require('./Freelancer');
const Employer = require('./Employer');
const Skills = require('./Skills');
const Proposal = require('./Proposal');
const Contract = require('./Contract');
const Message = require('./Message');
const Payment = require('./Payment');
const Review = require('./Review');
const User = require('./User');
const UserSecurity = require('./UserSecurity');

// Associations
Freelancer.hasMany(Skills, { foreignKey: 'freelancer_id' });
Skills.belongsTo(Freelancer, { foreignKey: 'freelancer_id' });

Employer.hasMany(Proposal, { foreignKey: 'employer_id' });
Proposal.belongsTo(Employer, { foreignKey: 'employer_id' });

Freelancer.hasMany(Contract, { foreignKey: 'freelancer_id' });
Contract.belongsTo(Freelancer, { foreignKey: 'freelancer_id' });

Proposal.hasMany(Message, { foreignKey: 'proposal_id' });
Message.belongsTo(Proposal, { foreignKey: 'proposal_id' });

Freelancer.hasMany(Payment, { foreignKey: 'freelancer_id' });
Payment.belongsTo(Freelancer, { foreignKey: 'freelancer_id' });

Freelancer.hasMany(Review, { foreignKey: 'freelancer_id' });
Review.belongsTo(Freelancer, { foreignKey: 'freelancer_id' });

module.exports = { Freelancer, Employer, Skills, Proposal, Contract, Message, Payment, Review, User, UserSecurity };

