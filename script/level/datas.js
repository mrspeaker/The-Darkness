var leveldata = {
    levels : [{
        name: "first",
        code: "a",
        width: 19,
        height: 14,
        blocks: " \
            1w1.1w1.1.1.1.1.1.1w1.1.1.1.1.1.1w1.1. \
            1wSa1w....D.......1w............1w..Eb \
            1w..1w1.1.1...>...1.......1w..>.1w..1w \
            1w!01w..........T4Z.......1.1.1.1.T31w \
            1w..1w..........................D...1w \
            1w..1wT0Z...........1w..........1w..1w \
            1wD.1...............1w..........1w..1w \
            1w..........1w1.1.!31.!41.1.1.1.1...1w \
            1w..........1w..>...........T3>...L41w \
            1w1.1.1.1.1.1w..............1.1.1.1.1w \
            1w..Z.T0....1w......Z...............1w \
            1w....!0....1.......................1w \
            1w.................>................1w \
            1.Ec1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1.1. \
            ",
        exits: ["a"]
    },{
        name: "two",
        code: "b",
        width: 19,
        height: 14,
        blocks: " \
            1w1.1.1.1.1.1.1.1.1.1.1.1w1.1.1.1w1.1w \
            1w......................1.......1wSb1w \
            1wL3..1w......L0........L0!3....1w..1w \
            1w1.1.1.........Z.......1.1.1.1.1...1w \
            1wL3......L3................D...!0..1w \
            1w..............Z...........1w1.1.1.1w \
            1w..1w....1.1.1.1.1.1.......1wT0Z...1w \
            1w..1w............L3........1.1.1w..1w \
            1wL31w....T3....................1w..1w \
            1w..1w..............Z...........1w..1w \
            1w..1w1.1.1w1.1.1w....T0........1w..1w \
            1w..1.....1w....1.........1.1.1.1...1w \
            1w......T01wT0..........L3..........1w \
            1.1.1.1.Ec1.1.1.1.1.1.1.1.1.1.1.1.1.1. \
            ",
        exits: ["b"]
    },
    {
        name: "tree",
        code: "c",
        width: 8,
        height: 6,
        blocks: " \
            1w1.1.1.1.1.1.1w \
            1wSc..........1w \
            1w............1w \
            1.1w..........1w \
            ..1.1.1.1w....1w \
            ........1.1.Ea1. \
            ",
        exits: ["c"]
    }],

    byId: function(id) {
        for(var i = 0; i < this.levels.length; i++) {
            var hasExit = this.levels[i].exits.some(function(item){
                return item === id;
            });
            if(hasExit) {
                return this.levels[i];
            }
        }
    },
    byName: function(name) {
        return this.levels.filter(function(l){
            return name === l.name;
        })[0];
    }
};