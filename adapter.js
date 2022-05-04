// interface original

class Shipping {
    constructor() {
        this.request = function (zipStart, zipEnd, weight) {
            console.log('all data from original interface', {
                zipStart: zipStart,
                zipEnd: zipEnd,
                weight: weight
            });
            return weight * 2.5;
        };
    }
}

// new interface

class NewShipping {
    constructor() {
        this.login = function (credentials) {
            console.log('validate credentials', credentials);
        };
        this.setStart = function (start) {
            // ...
        };
        this.setDestination = function (destination) {
            /* ... */
        };
        this.calculate = function (weight) {
            return weight * 1.5;
        };
    }
}

// adapter interface

function ShippingAdapter(credentials) {
    var shipping = new NewShipping();

    shipping.login(credentials);

    return {
        request: function (zipStart, zipEnd, weight) {
            shipping.setStart(zipStart);
            shipping.setDestination(zipEnd);
            return shipping.calculate(weight);
        }
    };
}

function run() {
    var shipping = new Shipping();
    var credentials = { token: '30a8-6ee1' };
    var adapter = new ShippingAdapter(credentials);

    // original shipping object and interface

    var cost = shipping.request('78701', '10010', 20);
    console.log(
        'Old cost: ' +
            new Intl.NumberFormat('pt-BR', {
                currency: 'BRL',
                style: 'currency'
            }).format(cost)
    );

    // new shipping object with adapted interface

    cost = adapter.request('78701', '10010', 20);

    console.log(
        'New cost: ' +
            new Intl.NumberFormat('pt-BR', {
                currency: 'BRL',
                style: 'currency'
            }).format(cost)
    );
}

run();
