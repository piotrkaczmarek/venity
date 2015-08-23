describe('CarSrvSpec', function() {
  var createService;

  beforeEach(function() {
    var $injector = angular.injector(['venity']);

    createService = function() {
      return $injector.get('CarSrv');
    };
  });

  it('is defined', function() {
    var service = createService();

    expect(service).toBeTruthy();
  });

  describe('#isAvailable', function() {
    var start = new Date('2015-08-5');
    var end = new Date('2015-08-8');

    describe('when both dates are provided', function() {
      describe('when it is available', function() {
        it('returns true', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-03T17:11:11.756Z',
                end_datetime: '2015-08-04T17:11:11.756Z'
              },
              {
                start_datetime: '2015-08-09T17:11:11.756Z',
                end_datetime: '2015-08-10T17:11:11.756Z'
              }
            ]
          };
          expect(createService().isAvailable(car, start, end)).toBeTruthy();
        });
      });

      describe('when start date collides', function() {
        it('returns false', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-03T17:11:11.756Z',
                end_datetime: '2015-08-06T17:11:11.756Z'
              }
            ]
          };
          expect(createService().isAvailable(car, start, end)).toBeFalsy();
        });
      });

      describe('when end date collides', function() {
        it('returns false', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-07T17:11:11.756Z',
                end_datetime: '2015-08-11T17:11:11.756Z'
              }
            ]
          };
          expect(createService().isAvailable(car, start, end)).toBeFalsy();
        });
      });

      describe('when there is other ride between start and end', function() {
        it('returns false', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-06T17:11:11.756Z',
                end_datetime: '2015-08-07T17:11:11.756Z'
              }
            ]
          };
          expect(createService().isAvailable(car, start, end)).toBeFalsy();
        });
      });

      describe('when there is other longer ride around dates', function() {
        it('returns false', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-01T17:11:11.756Z',
                end_datetime: '2015-08-10T17:11:11.756Z'
              }
            ]
          };
          expect(createService().isAvailable(car, start, end)).toBeFalsy();
        });
      });

      describe('when dates collide with two different rides', function() {
        it('returns false', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-01T17:11:11.756Z',
                end_datetime: '2015-08-06T17:11:11.756Z'
              },
              {
                start_datetime: '2015-08-07T17:11:11.756Z',
                end_datetime: '2015-08-10T17:11:11.756Z'
              }
            ]
          };
          expect(createService().isAvailable(car, start, end)).toBeFalsy();
        });
      });
    });

    describe('when only start date is provided', function() {
      describe('when there is ride that finished before start', function() {
        it('returns true', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-01T17:11:11.756Z',
                end_datetime: '2015-08-04T17:11:11.756Z'
              }
            ]
          };

          expect(createService().isAvailable(car, start)).toBeTruthy();
        });
      });

      describe('when there is ride that begins after start', function() {
        it('returns true', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-10T17:11:11.756Z',
                end_datetime: '2015-08-11T17:11:11.756Z'
              }
            ]
          };

          expect(createService().isAvailable(car, start)).toBeTruthy();
        });
      });

      describe('when there is ride that does not finish before start', function() {
        it('returns false', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-01T17:11:11.756Z',
                end_datetime: '2015-08-11T17:11:11.756Z'
              }
            ]
          };

          expect(createService().isAvailable(car, start)).toBeFalsy();
        });
      });
    });


    describe('when only end date is provided', function() {
      describe('when there is ride that finished before end', function() {
        it('returns true', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-01T17:11:11.756Z',
                end_datetime: '2015-08-07T17:11:11.756Z'
              }
            ]
          };

          expect(createService().isAvailable(car, undefined, end)).toBeTruthy();
        });
      });

      describe('when there is ride that begins after end', function() {
        it('returns true', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-10T17:11:11.756Z',
                end_datetime: '2015-08-11T17:11:11.756Z'
              }
            ]
          };

          expect(createService().isAvailable(car, undefined, end)).toBeTruthy();
        });
      });

      describe('when there is ride that does not finish before start', function() {
        it('returns false', function() {
          var car = {
            active_rides: [
              {
                start_datetime: '2015-08-01T17:11:11.756Z',
                end_datetime: '2015-08-11T17:11:11.756Z'
              }
            ]
          };

          expect(createService().isAvailable(car, undefined, end)).toBeFalsy();
        });
      });
    });
  });
});
