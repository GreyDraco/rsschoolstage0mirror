export const gameEventsData = {
  village: {
    immediateBattle: {
      text: "Вы ограбили деревню, и теперь жители полны ярости. Их глаза сверкают от ненависти, а сердца переполнены жаждой вашей крови. Они собирают отряд, готовый к преследованию, и вскоре вам придется столкнуться с последствиями своего поступка. Убежать будет непросто, и месть за грабеж уже близка.",
      varID: "imBattle",
      rewards: { gold: 300 },
      battle: { guard: 5, knight: 1 },
      img: "./assets/events/village/village-immediateBattle.jpeg",
    },
    text: "Наступили тяжелые времена, и ваши золотые запасы на исходе. В безысходности вы принимаете отчаянное решение: ограбить ближайшую деревню. Нападая на неё, вы требуете золота, но жители жалуются, что у них едва хватает средств на жизнь. Все, что они смогли собрать, — это жалкие 50 монет. Вы смотрите на них с недоверием, задумавшись: хватит ли вам этой суммы? Ваша жажда богатства сталкивается с реальностью, и вам предстоит решить, стоит ли оставить деревню в покое или пойти на крайние меры.",
    rewards: null,
    img: "./assets/events/village/village-start-event.jpeg",
    vars: {
      var1: {
        varDesc: "Забрать 50 монет",
        varID: "var1",
        text: "Жители отдают вам 50 монет. Однако, как только вы поворачиваетесь, чтобы уйти, слышите смех за спиной. Они смеются над вами, уверенные, что одурачили вас. Это унижение бьет по вашему авторитету, и вы ощущаете, как теряете уровень, оставшись с горьким осадком позора.",
        vars: null,
        rewards: { playerLvl: -1, abilities: null, gold: 50 },
        check: null,
        battle: { guard: 5, knight: 0 },
        img: "./assets/events/village/village-pick-up-сoins.jpeg",
      },
      var2: {
        varDesc: "Оставить деньги жителям",
        varID: "var2",
        text: "Вы проявляете такую благородность, что решаете оставить все деньги жителям. Вам они не принесут радости, а им гораздо нужнее. Один из жителей, тронутый вашим поступком, с искренней благодарностью обращается к вам. В его глазах сияет надежда: теперь он сможет выплатить кредит за курсы успешного успеха, которые посетил в городе. В знак признательности он делится с вами знаниями, полученными на этих курсах. С каждым словом вы чувствуете, как внутри вас пробуждается новая способность. Теперь вы обладаете даром торговли, который откроет перед вами двери к новым возможностям и выгодным сделкам!",
        vars: null,
        rewards: { playerLvl: null, abilities: { bargain: 1 }, gold: null },
        check: null,
        battle: null,
        img: "./assets/events/village/village-leave-money-villagers.jpeg",
      },
      var3: {
        varDesc: "Запугать жителей",
        varID: "var3",
        text: "Ваши ноздри раздуваются... Из них вырывается густой дым и...",
        vars: {
          varw: {
            varDesc: "Ок",
            varID: "var3w",
            text: "Ваши ноздри раздуваются, и из них вырывается густой дым. Громкое рычание разрывает тишину, и из вашей пасти извергается пламя, обжигая воздух и ужасая бедных жителей. Они в панике отдают вам свои последние деньги, осознав, что сопротивление бесполезно. Теперь они боятся вас, и эта аура страха лишь укрепляет вашу власть. С мешком золота, набитым до отказа, вы отправляетесь домой, ощущая гордость и уверенность. Ваш уровень повысился, открывая новые горизонты силы и возможностей!",
            vars: null,
            rewards: { playerLvl: 1, abilities: null, gold: 600 },
            check: null,
            battle: null,
            img: "./assets/events/village/village-intimidate-win.jpeg",
          },
          varl: {
            varDesc: "Ок",
            varID: "var3l",
            text: "Ваши ноздри раздуваются, и из них вырывается густой дым, но вскоре кашель прерывает ваше величественное присутствие — старость, увы, не радует. Жители, увидев вашу слабость, заливаются смехом. Вы низко пали в их глазах, и, хихикая, они презрительно называют вас безвредной ящеркой. С каждым их насмешливым словом вы чувствуете, как теряете уровень, а они без стеснения забирают даже те жалкие гроши, которые предлагали вам в начале. Теперь вы не внушаете им страха, и это пробуждает в них жадность. Вскоре они придут к вам, надеясь завладеть вашим золотом и вашей, хоть и дряблой, но все еще ценной на черном рынке шкурой. Надеюсь, ваш замок готов к их дерзкому визиту.",
            vars: null,
            rewards: { playerLvl: -1, abilities: null, gold: null },
            check: null,
            battle: { guard: 10, knight: 0 },
            img: "./assets/events/village/village-intimidate-lose.jpeg",
          },
        },
        rewards: null,
        check: { die: 3 },
        battle: null,
      },
    },
  },

  city1: {
    immediateBattle: {
      text: "Вы ограбили город, оставив его жителей в ужасе и отчаянии. Теперь в их глазах сверкает жажда мести, а сердца наполняются ненавистью. Они собираются в отряд, полные решимости вернуть то, что было украдено, и в их сердцах лишь одно желание — отомстить вам. Волнение нарастает, и вы понимаете: теперь вам придется столкнуться с гневом тех, кого вы лишили покоя.",
      varID: "imBattle",
      rewards: { gold: 1000 },
      battle: { guard: 14, knight: 8 },
      img: "./assets/events/city1/city1-immediateBattle.jpeg",
    },
    text: "До Вас давно доходили слухи, что в некотором городе можно не только разжиться золотом, но и получить полезные знания. И вот, наконец, Вы добираетесь до такого города. Этот город кишит богачами. Хотя, вероятно, большинство из них обычные инфоцыгане, наживающиеся на человеческой глупости. Но ведь Вы ДРАКОН, Вы граздо умнее жалких людишек. Вы видите объявление о наборе на курсы успешного успеха. Но цена немного кажется Вам завышенной: 1000 монет. Готовы ли Вы потратить свои кровно ̶у̶к̶р̶а̶д̶е̶н̶н̶ы̶е̶  заработанные монеты?",
    rewards: null,
    img: "./assets/events/city1/city1-start-event.jpeg",
    vars: {
      var1: {
        varDesc: "Заплатить 1000$",
        varID: "var1",
        text: "",
        vars: {
          varw: {
            varDesc: "Ок",
            varID: "var3w",
            text: "На курсах вы обретаете уникальные знания, позволяющие вам искусно манипулировать теми, кто движим жадностью и невежеством. Ваши навыки красноречия возросли, и вместе с этим вы ощущаете невероятный прилив мотивации, словно теперь перед вами нет преград. Кажется, вы способны достичь любых целей, какими бы амбициозными они ни были. Возможно, однажды вы решитесь на большее и бросите вызов самому Королю, расширив свои владения. Ваш уровень возрос. А еще вы проявили смекалку на торгах, заплатив меньше, чем ожидали!",
            vars: null,
            rewards: { playerLvl: 1, abilities: { bargain: 2 }, gold: -800 },
            img: "./assets/events/city1/city1-pay.jpeg",
            check: null,
            battle: null,
          },
          varl: {
            varDesc: "Ок",
            varID: "var3l",
            text: "На курсах вам открываются тайные знания, позволяющие ловко обводить вокруг пальца тех, кто ведом жадностью и глупостью. Ваше красноречие достигло новых высот, а вместе с ним возросла и внутренняя мотивация — теперь вам кажется, что нет ничего невозможного. Возможно, однажды вы решитесь укрепить свои владения и даже бросите взгляд на трон самого Короля. Ваш уровень повысился. Однако ваши попытки сбить цену оказались безуспешны.",
            vars: null,
            rewards: { playerLvl: 1, abilities: { bargain: 2 }, gold: -1000 },
            check: null,
            battle: null,
            img: "./assets/events/city1/city1-pay.jpeg",
          },
        },
        rewards: null,
        check: { bargain: 1, gold: 1000 },
        battle: null,
      },
      var2: {
        varDesc: "Отказаться",
        varID: "var2",
        text: "Вы считаете, что в нынешние неопределённые времена не стоит тратить столько денег на подобные мероприятия. Никогда не знаешь, когда финансовая подушка может оказаться жизненно важной. Однако, если бы вам предложили скидку, вы, возможно, пересмотрели бы своё решение и не отказались от столь заманчивого предложения.",
        img: "./assets/events/city1/city1-start-event.jpeg",
        vars: {
          var21: {
            varDesc: "Все равно отказаться",
            varID: "var3w",
            text: "Вы всё-таки отказываетесь, решив, что при текущем нестабильном курсе это слишком рискованное вложение. Деньги лучше сберечь для более нужных целей. Вы возвращаетесь домой",
            vars: null,
            rewards: { playerLvl: 0, abilities: null, gold: 0 },
            check: null,
            battle: null,
            img: "./assets/events/city1/city1-refuse.jpeg",
          },
          var22: {
            varDesc: "Попросить скидку",
            varID: "var3l",
            text: "",
            vars: {
              varw: {
                varDesc: "Ок",
                varID: "var3w",
                text: "Подойдя к тренеру, вы начинаете жалобно умолять о скидке на его курс. И хотя сначала он категорически отказывается, пара яростных клубов пламени, вырвавшихся из вашей пасти в его сторону, быстро меняют его мнение. Скидка получена, и тренер, похоже, не собирается спорить дальше.",
                vars: null,
                rewards: {
                  playerLvl: 1,
                  abilities: { bargain: 1 },
                  gold: -800,
                },
                check: null,
                battle: null,
                img: "./assets/events/city1/city1-ask-discount-win.jpeg",
              },
              varl: {
                varDesc: "Ок",
                varID: "var3l",
                text: "Подходя к тренеру, вы начинаете жалобно просить скидку на его курс, но его пренебрежительный взгляд, будто он видит перед собой нищеброда, бьет прямо по самолюбию. В попытке запугать его своим пламенем вы делаете глубокий вдох, но вместо мощного огненного всплеска из вашей пасти вырываются лишь жалкие колечки дыма, сопровождаемые горькими всхлипываниями. Ощущение обиды поглощает вас, и, охваченный досадой, вы стараетесь незаметно ускользнуть, но увы - чувство стыда уже не отпустит. Уровень потерян. Вы теряете уровень",
                vars: null,
                rewards: { playerLvl: -1, abilities: null, gold: null },
                check: null,
                battle: null,
                img: "./assets/events/city1/city1-ask-discount-lose.jpeg",
              },
            },
            rewards: null,
            check: { die: 3, gold: 100 },
            battle: null,
          },
        },
      },
    },
  },

  cultists: {
    immediateBattle: {
      text: "Вы обобрали последователей темного культа, и теперь они жаждут вашей крови",
      varID: "imBattle",
      rewards: { gold: 1500 },
      img: "./assets/events/cultists/cultists-immediateBattle.jpeg",
      battle: {
        guard: 0,
        knight: 0,
        cultist: 10,
      },
    },
    text: "Вы обнаружили храм, принадлежащий древнему культу, где под сводами хранятся древние свитки, наполненные сакральными знаниями об управлении стихиями. Эти тайны, передаваемые из поколения в поколение только избранным членам культа, остаются недоступны для посторонних. Культисты ревностно охраняют свои секреты, не желая делиться ими с чужаками. Но тут к вам приближается один из них — хитрый и озлобленный на своих собратьев. Разочарованный в учениях, он предлагает сделку: за 10 000 монет он готов раскрыть вам все скрытые истины, предав свой культ",
    rewards: null,
    img: "./assets/events/cultists/cultists-baryga.jpeg",
    vars: {
      var1: {
        varDesc: "Заплатить предателю",
        varID: "var1",
        text: "",
        vars: {
          varw: {
            varDesc: "Ок",
            varID: "var3w",
            text: "Вы передаете обещанную сумму, и в ответ получаете древние знания о том, как повелевать молниями. К тому же ваш торг оказался удачным: вам удалось сбить цену, сэкономив немало золота. Теперь в ваших руках — сила стихии и ощущение, что сделка была вдвойне выгодной.",
            vars: null,
            rewards: { playerLvl: 0, abilities: { lightning: 1 }, gold: -7000 },
            img: "./assets/events/cultists/cultists-pay-to-baryga.jpeg",
            check: null,
            battle: null,
          },
          varl: {
            varDesc: "Ок",
            varID: "var3l",
            text: "Вы передаете всю обещанную сумму, надеясь на удачный торг, но попытка сбить цену проваливается. Культист, не уступая ни монеты, берет полную плату. Взамен вы получаете сокровенные знания о том, как управлять молниями, но осадок от потери золота омрачает этот момент.",
            vars: null,
            rewards: {
              playerLvl: 1,
              abilities: { lightning: 1 },
              gold: -10000,
            },
            img: "./assets/events/cultists/cultists-pay-to-baryga.jpeg",
            check: null,
            battle: null,
          },
        },
        rewards: null,
        check: { bargain: 1, gold: 10000 },
        battle: null,
      },

      var22: {
        varDesc: "Попытаться украсть свитки",
        varID: "var3l",
        text: "",
        rewards: null,
        check: { lvlCheck: 3 },
        battle: null,
        vars: {
          varw: {
            varDesc: "Ок",
            varID: "var3w",
            text: "Вы решаетесь украсть свитки, но ваш высокий уровень играет против вас. Вы слишком крупны и заметны, словно слон в посудной лавке. Шорохи и неуклюжие движения привлекают внимание, и в мгновение ока вас раскрывают. Теперь ваше положение критическое — культ уже готов нанести удар, и вам точно не избежать расплаты.",
            rewards: null,
            img: "./assets/events/cultists/cultists-steal-lose.jpeg",
            check: null,
            battle: null,
            vars: {
              var221: {
                varDesc: "Принять бой",
                varID: "var221",
                text: "Готовьтесь — враги уже близко. Их шаги гулко раздаются по каменным коридорам, и с каждой секундой они приближаются всё больше. У вас почти нет времени на раздумья — культисты уже здесь, и они не пощадят вас.",
                vars: null,
                rewards: null,
                check: null,
                img: "./assets/events/cultists/cultists-take-fight.jpeg",
                battle: {
                  guard: 0,
                  knight: 0,
                  cultist: 10,
                },
              },
              var222: {
                varDesc: "Откупиться за 5000 монет",
                varID: "var3l",
                text: "Вы, осознавая свою безвыходность, предлагаете культистам деньги в обмен на свою жизнь. Они, хмурясь, соглашаются, при этом в их взглядах читается не только жадность, но и пренебрежение. Они понимают, что даже если вы узнали некоторые секреты, ваша глупость не позволит вам использовать эти знания в своих интересах. В результате этого унижения вы теряете не только уровень, но и часть своих денег, оставляя за спиной лишь осадок неудачи и горечи.",
                vars: null,
                rewards: { playerLvl: -1, abilities: null, gold: -5000 },
                check: { gold: 5000 },
                battle: null,
                img: "./assets/events/cultists/cultists-steal-bribe.jpeg",
              },
            },
          },
          varl: {
            varDesc: "Ок",
            varID: "var3l",
            text: "К счастью, ваш невысокий уровень оказался на вашей стороне. Вас не заметили, и вы смогли незамеченно украсть свитки. Теперь перед вами открывается доступ к новым знаниям об управлении молниями. С каждым словом, написанным на древних пергаментах, вы ощущаете, как сила стихии начинает наполнять вас, открывая путь к невиданным возможностям. Вы чувствуете, как сила стихии наполняет вас?",
            img: "./assets/events/cultists/cultists-steal-win.jpeg",
            rewards: null,
            battle: null,
            check: null,
            vars: {
              var221: {
                varDesc: "Пока нет",
                varID: "var221",
                text: "Значит, вы ощутите её позже. Отправляйтесь домой, а силу сможете применить уже в следующем бою. Подготовьтесь к новым испытаниям и дайте себе время освоить эти знания!",
                vars: null,
                rewards: { playerLvl: 1, abilities: { lightning: 1 }, gold: 0 },
                check: null,
                battle: null,
                img: "./assets/events/cultists/cultists-imagine.jpeg",
              },
              var222: {
                varDesc: "Еще как!",
                varID: "var222",
                text: "",
                vars: {
                  varw: {
                    varDesc: "Ок",
                    varID: "var3w",
                    text: "Наполненный радостью и новой силой, вы прощаетесь с культистами, уверенный в своем успехе. Однако, прямо перед выходом из храма у вас выскальзывает из кармана украденный свиток и падает на пол. Сердце замирает от тревоги, и вы стараетесь незаметно наклониться, чтобы поднять его, одновременно испытывая страх, что кто-то может вас заметить. Ваша удача может оборваться в одно мгновение... Вы наклоняетесь и, к счастью, незаметно подбираете свиток. Культисты ничего не замечают, и сердце наполняется ликованием. Теперь вы на высоте! Уверенный в себе и довольный, вы покидаете храм и направляетесь домой, радуясь своей хитрости и новой силе, которая вскоре станет вам в помощь.",
                    img: "./assets/events/cultists/cultists-steal-pick-up.jpeg",
                    vars: null,
                    rewards: {
                      playerLvl: 2,
                      abilities: { lightning: 1 },
                      gold: 0,
                    },
                    check: null,
                    battle: null,
                  },
                  varl: {
                    varDesc: "Ок",
                    varID: "var3l",
                    text: "Наполненный радостью и новой силой, вы прощаетесь с культистами, уверенный в своем успехе. Однако, прямо перед выходом из храма у вас выскальзывает из кармана украденный свиток и падает на пол. Сердце замирает от тревоги, и вы стараетесь незаметно наклониться, чтобы поднять его, одновременно испытывая страх, что кто-то может вас заметить. Ваша удача может оборваться в одно мгновение... Вы наклоняетесь, чтобы поднять свиток, но вдруг спотыкаетесь о него и с грохотом падаете на пол. Звуки вашего падения мгновенно привлекают внимание культистов, и они стремглав прибегают к месту происшествия. Поняв, что вы пытались выкрасть свиток, они охватываются яростью. Вы спасаетесь бегством.",
                    vars: null,
                    img: "./assets/events/cultists/cultists-steal-drop.jpeg",
                    rewards: { playerLvl: -1 },
                    check: null,
                    battle: {
                      guard: 0,
                      knight: 0,
                      cultist: 10,
                    },
                  },
                },
                rewards: null,
                check: { die: 3 },
                battle: null,
              },
            },
          },
        },
      },
      var3: {
        varDesc: "Отказаться",
        varID: "var1",
        text: "Вы отказываетесь от сделки, и предатель с презрением заявляет, что вы недостойны этих знаний, бросая вам на прощание уничижительный взгляд. От этого унижения вы чувствуете, как утрачиваете свою силу — уровень снижается, оставляя неприятное ощущение слабости. Но ваша проблема только начинается. Пока вы вели разговор с предателем, другой член культа незаметно подслушал каждое слово. Теперь весь культ встревожен: они боятся, что их секреты могут стать достоянием чужаков. Желание сохранить свои темные знания любой ценой заставляет их действовать решительно. Они жаждут вашей смерти.",
        vars: null,
        rewards: { playerLvl: -1, abilities: null, gold: 0 },
        check: null,
        img: "./assets/events/cultists/cultists-refuse-pay-baryga.jpeg",
        battle: { guard: 0, knight: 0, cultist: 10 },
      },
    },
  },

  city2: {
    immediateBattle: {
      text: "Вы ограбили город, оставив его жителей в ужасе и отчаянии. Теперь в их глазах сверкает жажда мести, а сердца наполняются ненавистью. Они собираются в отряд, полные решимости вернуть то, что было украдено, и в их сердцах лишь одно желание — отомстить вам. Волнение нарастает, и вы понимаете: теперь вам придется столкнуться с гневом тех, кого вы лишили покоя.",
      varID: "imBattle",
      rewards: { gold: 2000 },
      battle: { guard: 20, knight: 10 },
      img: "./assets/events/city2/city2-immediateBattle.jpeg",
    },

    text: "Вы снова ищете добычу, когда внезапно до вас доносится музыка с главной площади. В городе праздник — люди ликуют по случаю гибели дракона, долго терзавшего их. Вы замечаете принцессу, забывшую об осторожности и весело танцующую среди подданных. Без промедления вы похищаете её, но жители бросаются на вас, пытаясь спасти принцессу и покончить с вами.",
    rewards: null,
    img: "./assets/events/city2/city2-start-event.jpeg",
    check: null,
    vars: {
      var1: {
        varDesc: "Бежать",
        varID: "var1",
        text: "",
        vars: {
          varw: {
            varDesc: "Ок",
            varID: "var3w",
            rewards: null,
            check: null,
            battle: null,
            img: "./assets/events/city2/city2-ambassador.jpeg",
            text: "Застигнутые врасплох, жители в панике. Вы быстро хватаете принцессу и взмываете в небо. Доставив её в свой замок, вы запираете её в башне, надеясь обменять пленницу на гору золота. Вскоре на пороге вашего замка появляется посол с предложением: 7000 в обмен на принцессу. Но стоит ли соглашаться сразу? Возможно, удержав её ещё немного, вы получите более выгодное предложение. Выбирайте: принять сделку или подождать и рискнуть, надеясь на лучший выкуп.",
            vars: {
              var1: {
                varDesc: "Согласиться",
                varID: "var221",
                text: "",
                vars: {
                  varw: {
                    varDesc: "Ок",
                    varID: "var3w",
                    text: "Вы соглашаетесь на щедрое предложение, но сумели выторговать ещё больше. За освобождение принцессы вы получаете 10 000 монет. Получив золото, вы отпускаете пленницу и наслаждаетесь своим удачным торгом.",
                    img: "./assets/events/city2/city2-ambassador-accept.jpeg",
                    vars: null,
                    rewards: {
                      playerLvl: 1,
                      gold: 10000,
                    },
                    check: null,
                    battle: null,
                  },
                  varl: {
                    img: "./assets/events/city2/city2-ambassador-accept.jpeg",
                    varDesc: "Ок",
                    varID: "var3l",
                    text: "Вы соглашаетесь на предложение посла и получаете деньги. Пытаетесь выторговать больше, но он настаивает, что все средства уже потрачены на праздник, и это всё, что у них осталось. В итоге вы отпускаете принцессу, забирая 7000 монет. Несмотря на небольшую сумму, это всё же неплохой улов.",
                    vars: null,
                    rewards: {
                      playerLvl: 1,
                      gold: 7000,
                    },
                    check: null,
                    battle: null,
                  },
                },
                rewards: null,
                check: { bargain: 3 },
                battle: null,
              },

              var2: {
                varDesc: "Отказаться",
                varID: "var222",
                text: "Вы решаете отказаться от предложения посла, полагая, что за принцессу можно выторговать гораздо больше, чем эти жалкие гроши. Или, возможно, лучше оставить её себе — в хозяйстве пригодится. Услышав о вашем трофее, к вам приходят культисты. Хотя они не богаты золотом, у них есть ценнейшие знания. Они предлагают поделиться древними секретами управления огнем в обмен на принцессу. Согласитесь ли вы на этот необычный обмен?",
                img: "./assets/events/city2/city2-cultists.jpeg",
                vars: {
                  var1: {
                    varDesc: "Согласиться",
                    varID: "var3w",
                    text: "Вы решаете отдать принцессу культистам в обмен на их сакральные знания об управлении огнем. Как дракон, вы понимаете, насколько важна для вас эта техника. С каждым словом, которое они произносят, вы ощущаете, как сила наполняет вас. Ваш уровень растет, а способность метать огненные шары значительно усиливается. Теперь вы стали еще более могущественным существом! Однако Король не собирается прощать вам похищение дочери. Его войска уже направляются к вашей крепости, готовясь к мести. Теперь вам предстоит защитить свой замок и применить новые навыки управления огнем против надвигающейся угрозы. Подготовьтесь к битве!",
                    vars: null,
                    img: "./assets/events/city2/city2-cultists-accept.jpeg",
                    rewards: {
                      playerLvl: 1,
                      abilities: { fireball: 1 },
                      gold: 0,
                    },
                    check: null,
                    battle: { guard: 20, knight: 15 },
                  },
                  var2: {
                    varDesc: "Оставить принцессу себе",
                    varID: "var3l",
                    img: "./assets/events/city2/city2-cultists-refuse.jpeg",
                    text: "Вы решаете отказаться от предложения культистов, уверенный в своей силе. Вам не нужны их уроки обращения с огнем. Лучше оставить принцессу себе — она станет не только украшением вашего замка, но и полезной помощницей по хозяйству. С таким трофеем вы будете в состоянии укрепить свои позиции и развивать свои возможности. Однако Король не собирается прощать вам похищение дочери. Его войска уже направляются к вашей крепости, готовясь к мести. Подготовьтесь к битве!",
                    vars: null,
                    rewards: { abilities: { princess: 1 } },
                    check: null,
                    battle: {
                      guard: 20,
                      knight: 15,
                      cultist: 2,
                    },
                  },
                },
                rewards: null,
                check: null,
                battle: null,
              },
            },
          },

          varl: {
            varDesc: "Ок",
            varID: "var3l",
            img: "./assets/events/city2/city2-run-lose.jpeg",
            text: "Вы пытаетесь взлететь с принцессой в лапах, но быстро понимаете, что она слишком тяжела для вас. Приходится бросить её и спешно ретироваться. Вы едва успеваете скрыться из города. Жители осознают, что вы слабы и решают покончить с вами, прежде чем вы станете новой угрозой для их мира. Похоже, вам не удастся избежать битвы",
            vars: null,
            rewards: null,
            check: null,
            battle: { guard: 14, knight: 10, cultist: 0 },
          },
        },
        rewards: null,
        check: { lvlCheck: 3 },
        battle: null,
      },
      var2: {
        varDesc: "Сражаться",
        varID: "var2",
        text: "",
        rewards: null,
        check: { die: 3, lvlCheck: 2 },
        battle: null,
        vars: {
          varw: {
            varDesc: "ок",
            varID: "var3w",
            text: "Вы яростно отбиваетесь от жителей, и, к счастью, часть из них уже изрядно пьяна и не может составить вам серьезной конкуренции. В процессе вы сжигаете несколько домов, забирая все ценные вещи, которые сможете унести. Наконец, вы улетаете с награбленным имуществом и принцессой в свой замок, чувствуя себя триумфатором. Доставив принцессу в свой замок, вы запираете её в башне, надеясь обменять пленницу на гору золота. Вскоре на пороге вашего замка появляется посол с предложением: 7000 в обмен на принцессу. Но стоит ли соглашаться сразу? Возможно, удержав её ещё немного, вы получите более выгодное предложение. Выбирайте: принять сделку или подождать и рискнуть, надеясь на лучший выкуп.",
            img: "./assets/events/city2/city2-ambassador.jpeg",

            rewards: { playerLvl: 1, abilities: null, gold: 1000 },
            check: null,
            battle: null,
            vars: {
              var1: {
                varDesc: "Согласиться",
                varID: "var221",
                text: "",
                vars: {
                  varw: {
                    varDesc: "Ок",
                    varID: "var3w",
                    text: "Вы соглашаетесь на щедрое предложение, но сумели выторговать ещё больше. За освобождение принцессы вы получаете 10 000 монет. (+1000 награбленное) Получив золото, вы отпускаете пленницу и наслаждаетесь своим удачным торгом. ",
                    img: "./assets/events/city2/city2-ambassador-accept.jpeg",
                    vars: null,
                    rewards: {
                      playerLvl: 2,
                      gold: 11000,
                    },
                    check: null,
                    battle: null,
                  },
                  varl: {
                    varDesc: "Ок",
                    varID: "var3l",
                    text: "Вы соглашаетесь на предложение посла и получаете деньги. Пытаетесь выторговать больше, но он настаивает, что все средства уже потрачены на праздник, и это всё, что у них осталось. В итоге вы отпускаете принцессу, забирая 7000 монет. (+1000 награбленное) Несмотря на небольшую сумму, это всё же неплохой улов.",
                    vars: null,
                    img: "./assets/events/city2/city2-ambassador-accept.jpeg",
                    rewards: {
                      playerLvl: 2,
                      gold: 8000,
                    },
                    check: null,
                    battle: null,
                  },
                },
                rewards: null,
                check: { bargain: 3 },
                battle: null,
              },

              var2: {
                varDesc: "Отказаться",
                varID: "var222",
                text: "Вы решаете отказаться от предложения посла, полагая, что за принцессу можно выторговать гораздо больше, чем эти жалкие гроши. Или, возможно, лучше оставить её себе — в хозяйстве пригодится. Услышав о вашем трофее, к вам приходят культисты. Хотя они не богаты золотом, у них есть ценнейшие знания. Они предлагают поделиться древними секретами управления огнем в обмен на принцессу. Согласитесь ли вы на этот необычный обмен?",
                img: "./assets/events/city2/city2-cultists.jpeg",
                vars: {
                  var1: {
                    varDesc: "Согласиться",
                    varID: "var3w",
                    text: "Вы решаете отдать принцессу культистам в обмен на их сакральные знания об управлении огнем. Как дракон, вы понимаете, насколько важна для вас эта техника. С каждым словом, которое они произносят, вы ощущаете, как сила наполняет вас. Ваш уровень растет, а способность метать огненные шары значительно усиливается. Теперь вы стали еще более могущественным существом! Однако Король не собирается прощать вам похищение дочери. Его войска уже направляются к вашей крепости, готовясь к мести. Теперь вам предстоит защитить свой замок и применить новые навыки управления огнем против надвигающейся угрозы. Подготовьтесь к битве!",
                    vars: null,
                    img: "./assets/events/city2/city2-cultists-accept.jpeg",
                    rewards: {
                      playerLvl: 2,
                      abilities: { fireball: 1 },
                      gold: 1000,
                    },
                    check: null,
                    battle: { guard: 20, knight: 15 },
                  },
                  var2: {
                    varDesc: "Оставить принцессу себе",
                    varID: "var3l",
                    img: "./assets/events/city2/city2-cultists-refuse.jpeg",
                    text: "Вы решаете отказаться от предложения культистов, уверенный в своей силе. Вам не нужны их уроки обращения с огнем. Лучше оставить принцессу себе — она станет не только украшением вашего замка, но и полезной помощницей по хозяйству. С таким трофеем вы будете в состоянии укрепить свои позиции и развивать свои возможности. Однако Король не собирается прощать вам похищение дочери. Его войска уже направляются к вашей крепости, готовясь к мести. Подготовьтесь к битве!",
                    vars: null,
                    rewards: {
                      playerLvl: 1,
                      abilities: { princess: 1 },
                      gold: 1000,
                    },
                    check: null,
                    battle: {
                      guard: 20,
                      knight: 15,
                      cultist: 2,
                    },
                  },
                },
                rewards: null,
                check: null,
                battle: null,
              },
            },
          },

          varl: {
            varDesc: "ок",
            varID: "var3l",
            text: "Вы яростно сражаетесь с жителями, но даже их опьянение не помогает вам одержать верх. Понимая, что ситуация безнадежна, вы принимаете трудное решение — бросаете принцессу и улетаете ни с чем. Теперь вам предстоит пережить поражение и найти способ восстановить свои силы и позиции.",
            vars: null,
            img: "./assets/events/city2/city2-run-lose.jpeg",
            rewards: { playerLvl: -1, abilities: null, gold: 0 },
            check: null,
            battle: null,
          },
        },
      },
    },
  },

  king: {
    img: "./assets/events/king/king.jpeg",
    text: "Долгие годы ожидания, амбиции росли вместе с вами, вытесняя всё вокруг, пока наконец не сравнялись с величием самого королевства. И вот, этот миг настал. Вы появляетесь на пороге тронного зала, оглушительный рык разносится по залу. Взгляд устремлён на трон, корону, символ власти, который отныне вы жаждете держать в своих руках. Но король не сдаст трон без боя. Гнев разгорается внутри вас подобно пламени, готовому вырваться наружу. Ваше желание победить настолько велико, что вы заявляете свою решимость сломить его волю, заставить склонить перед вами всё королевство. Не видя иного выхода, король призывает войска и готовится к битве. Это будет сражение, о котором будут говорить веками. Решающий момент настал. Силы столкнутся, и судьба королевства будет решена в огне грядущей битвы.",
    rewards: null,
    check: null,
    vars: null,
    battle: { guard: 30, knight: 20, cultist: 2, king: 1 },
  },
};
