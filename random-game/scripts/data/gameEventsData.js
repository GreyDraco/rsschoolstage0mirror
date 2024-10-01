import { gameEnemyWave } from "../consts.js";

export const gameEventsData = {
  village: {
    text: "Наступили тяжелые времена. Ваши золотые запасы на исходе. Ничего не остается, кроме как пойти на отчаянный шаг: ограбить ближайшую деревню. Вы нападаете на деревню и требуете золота. Жители деревни жалуются, что у них совсем мало денег. Все, что они смогли собрать - это жалкие 50 монет. Но хватит ли Вам этого?",
    rewards: null,
    vars: {
      var1: {
        varDesc: "Забрать 50 монет",
        varID: "var1",
        text: "Жители отдают Вам 50 монет, но за спиной смеются над Вами, что смогли Вас одурачить. Ваш авторитет падает. Вы теряете уровень",
        vars: null,
        rewards: { playerLvl: -1, abilities: null, gold: 50 },
        die: null,
        bargain: false,
        battle: { hasBattle: true, guard: 5, knight: 0 },
      },
      var2: {
        varDesc: "Оставить деньги жителям",
        varID: "var2",
        text: "Вы настолько благородны, что решаете оставить все деньги жителям. Им нужнее. Один из жителей благодарит Вас. Теперь на сэкономленные деньги он сможет отправить своего сына на курсы успешного успеха. Вам даступна новая способность. Теперь Вы можете торговаться!",
        vars: null,
        rewards: { playerLvl: null, abilities: { bargain: 1 }, gold: null },
        die: null,
        bargain: false,
        battle: null,
      },
      var3: {
        varDesc: "Запугать жителей",
        varID: "var3",
        text: "Вы грозно рычите",
        vars: {
          varw: {
            varDesc: "Ок",
            varID: "var3w",
            text: "Вы запугали",
            vars: null,
            rewards: { playerLvl: 1, abilities: null, gold: 100 },
            die: null,
            bargain: false,
            battle: null,
          },
          varl: {
            varDesc: "Ок",
            varID: "var3l",
            text: "Вы не запугали",
            vars: null,
            rewards: { playerLvl: -1, abilities: null, gold: null },
            die: null,
            bargain: false,
            battle: { hasBattle: true, guard: 10, knight: 0 },
          },
        },
        rewards: null,
        die: true,
        bargain: false,
        battle: null,
      },
    },
  },
};
