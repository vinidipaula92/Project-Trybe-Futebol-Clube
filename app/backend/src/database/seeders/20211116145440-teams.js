module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'teams',
      [
        {
          team_name: 'América-MG',
        },
        {
          team_name: 'Athletico-PR',
        },
        {
          team_name: 'Atlético-GO',
        },
        {
          team_name: 'Atlético-MG',
        },
        {
          team_name: 'Avaí',
        },
        {
          team_name: 'Botafogo',
        },
        {
          team_name: 'Bragantino',
        },
        {
          team_name: 'Ceará',
        },
        {
          team_name: 'Corinthians',
        },
        {
          team_name: 'Coritiba',
        },
        {
          team_name: 'Cuiabá',
        },
        {
          team_name: 'Flamengo',
        },
        {
          team_name: 'Fluminense',
        },
        {
          team_name: 'Fortaleza',
        },
        {
          team_name: 'Goiás',
        },
        {
          team_name: 'Juventude',
        },
        {
          team_name: 'Internacional',
        },
        {
          team_name: 'Palmeiras',
        },
        {
          team_name: 'Santos',
        },
        {
          team_name: 'São Paulo',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('teams', null, {});
  },
};
