const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', function (client) {

  console.log('client connect...', client.id);

  // client.on('typing', function name(data) {
  //   console.log(data);
  //   io.emit('typing', data)
  // })

  // client.on('message', function name(data) {
  //   console.log(data);
  //   io.emit('message', data)
  // })

  // client.on('location', function name(data) {
  //   console.log(data);
  //   io.emit('location', data);
  // })
  
  // client.on('driver_profile', function name(data) {
  //   console.log(data);
  //   io.emit('driver_profile', {
  //     'id': '1',
  //     'name': 'Haile',      
  //     'phoneNumber': 'phoneNumber',
  //     'isAvailable': true,
  //     'status': "true",
  //   });
  // })

  // client.emit('driver_availability',
  //   {
  //   'id': '1',
  //   'name': 'Haile',      
  //   'phoneNumber': 'phoneNumber',
  //   'isAvailable': true,
  //   'status': "true",
  //   }
  // );  

  client.on('connect', function () {
  })

  client.on('look_for_transfer_driver', function (data){
    console.log('Looking for driver....');
    io.emit('transfer_driver',{
      'driver_found': true,
      'driver_name': 'Abebaw butako',
      'driver_phone': '+251909525760',
    });
    setTimeout(
      function (){
        console.log('DRIVER IS HERE');
        client.emit('driver_here', {});
      },
      5000,
    );
  });

  client.on('verify_transfer', function(data) {
    console.log('Verify transfer...');
    if (data['verification_code'] == '4321'){
      io.emit('verify_transfer', {
        'verified': true
      });
    } else {
      io.emit('verify_transfer', {
        'verified': false
      });
    }
  });

  client.on('verify_dropoff', function(data) {
    console.log('Verify dropoff...');
    if (data['verification_code'] == '4321'){
      io.emit('verify_dropoff', {
        'verified': true
      });
    } else {
      io.emit('verify_dropoff', {
        'verified': false
      });
    }
  });
  
  client.on('driver_availability', function (data) {
    console.log('Availability ...', data)
    io.emit('driver_availability', {
      'id': '1',
      'name': 'Haile',      
      'phoneNumber': 'phoneNumber',
      'visibility': data['visibility'],
      'status': "true",
    });
    // send order_assignment
    if (data['visibility']) {
      io.emit(orderAssignmentKey,order );
    }
  })
  client.on('location_update', function (data) {
    console.log('location data ...', data)
    // io.emit('driver_availability', {
    //   'id': '1',
    //   'lat': 'Haile',      
    //   'lng': 'phoneNumber',
    //   'isAvailable': isAvailable,
    //   'status': "true",
    // });
    // if (!isAvailable) {
    //   client.disconnect();
    // }
  })
  const orderAssignmentKey = "order_assignment:3114c256-6cea-4582-9fe1-f51bb96554d6";
  const order = {
    'id': 'id',
    'businessCustomerName': "Boss burger",
    'orderCategory': 'singleToSingle',
    'orderStatus': 'unassigned',
    'orderType': 'ondemand',
    'serviceTypeName': "FOOD",
    'estimatedTripDistance': 3.4,
    'estimatedPrice': 5.4,
    'estimatedTime': 5.4,
    'pickupTasks': [{
      'id': '1',
      "address": "Kazanchis, Addis Ababa",
      'location': { "lat": 9.019138, "lng": 38.801672 },
      'responsiblePersonName': "Abaeb",
      'responsiblePersonPhone': "_234243",
      'status':'pending',
      'taskType':'pickup'
    }],
    'dropoffTasks': [{
      'id': '2',
      'address': "Bole, Addis Ababa",
      'location': { "lat": 8.989743, "lng": 38.794538 },
      'responsiblePersonName': "Abaeb",
      'responsiblePersonPhone': "_234243",
      'status':'pending',
      'taskType':'dropoff'
    }],
    'route': {
      "encodedPolyline": 'olpaGj{upLwAdAi@l@m@bASd@Qd@QKW]GIo@}A{DcK{AaGi@q@UGYd@mBtBoAbAa@f@o@DKFkAH}DHaDJYN}@x@sA`Ak@jAi@`AqBlAyFzCgAPm@\\k@b@]FaALuJmOmCaDyEgGoCqEu@y@w@{@KX]r@yA|Cc@dCaEnPsFjT{Nr^gI~S{@tB}AhAMJq@Nm@Go@@OJUXMv@B`@`@t@|@ZLd@Cr@iBbFs@dBoJtL}O`UmAjB{A|A_@n@yAnAaAt@mEvDcAhAuCpEkAhBu@bBuExG{FpIgMlQaFnFoE|DwRpPsN`M_EjDY?sAr@eCv@cAJ{CKoF_@wA?m@LmBbA}@hAy@tB}BhLsAtD}JfPwA`Ew@rDg@rBq@zAuAfCs@pDm@jB_@t@_ArCSrCSzM]|UJ`HArGHlB`@vCf@bBn@hAp@v@PDVF^ZPx@b@fBnAxC~AhCvAjBlBdB`D~Cd@~@TVPAFIZUt@OdCD|@I|Bk@dCOfCHhAGvBa@|Ba@|@B~@^t@l@pAnBnBrE`B`C~ClCtAl@|BZxJKvBHp@Vt@l@fCfCfCxBpBxBt@rA^vA^~EZzEb@dBjBvC~BrB~@tCFb@]jC}@hEqEfTkJjc@yGjQgG`MwAvCy@`CmE`UkDdQ{GxVoFrTsDpSoAvLyBbTaAvFeBjH{C~LgDvLyGjT}BpK{Ft\\cAhKg@lIi@rZ_@|Pg@lJq@~HaBxLyArH{CbLuCjJsApGs@dGUzDSbJCdDMZ?BYjE[|DWbDM\\o@l@uAFo@EgAAo@GuCUaE[sGe@{BO_BAyBh@kFtBeJpFyDzBkDdA{MhC{Jv@aAOmAaAwCyCcAq@o@UsA_@uA{@iA{@iAyAcDkEoEmEqDuCqAy@gG}A{@c@uCgC{AsA][g@nA}@rBwAdD_AtBg@jAAh@yBzIQbEZpQ`D|W~@zHfArFXlCAbFLnCbBrJFrAIjCXrFAtG^lJQ~EUnFj@`IbAxDxAnEVpBE|D_@tHHhB~@xB\\h@wAtBu@dAoDdFa@`Ag@jC_AzI}AvSi@pG[tIi@lTPhD`@fEN`NFvT@fCQhBeBvGgFzKkBdG_@vBWdDg@vGsAjRiDpf@eBxd@}AhGmEdJyBzG_BfDmFlJiBjFYdBOtDOfBs@hD{D`Nu@~C[hEZbGU~JB`FVvGr@nIf@`IHpEV`Cl@fDPnCVbJj@zKCzBu@tKc@zD{@fE{BnD_A~Am@hBmAvCk@Zk@h@kBtAi@`@Tx@jBmAx@m@RW',
      "bounds": {
        "northeast": { 'lat': 42.4614275, 'lng': -71.0552091 },
        "southwest": { "lat": 42.3599162, "lng": -71.3496743 }
      }
    },
  };
  client.on('order_cancellation', (data)=>{
    console.log(`Order cancelled ${data}`)
  })
  client.on('cancellation_reasons', (data) => {
    console.log(`data ${data}`)
    io.emit('cancellation_reasons', {
      'cancellation_reasons': [
        "Order too far",
        "I am busy",
        "Who cares man"
      ],
    });
  })
  client.on(orderAssignmentKey, function (data) {
    console.log('order ... ', data)    
    // io.emit(orderAssignmentKey,order );    
    // io.emit(orderAssignmentKey, data);
  })
  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    
  })
  

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

var server_port = process.env.PORT || 3000;
server.listen(server_port, function (err) {
  if (err) throw err
  console.log('Listening on port %d', server_port);
});