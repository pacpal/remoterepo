package trip

import (
	"context"
	trippb "coolcar/proto/gen/go"
)

type Service struct {
	trippb.UnimplementedTripServiceServer
}

func (*Service) GetTrip(c context.Context,
	req *trippb.GetTripRequest) (*trippb.GetTripResponse, error) {
	return &trippb.GetTripResponse{
		Id: req.Id,
		Trip: &trippb.Trip{
			Start:       "abc",
			End:         "def",
			DurationSec: 3600,
			FeeCent:     10000,
			StartPos: &trippb.Location{
				Latitude:   30,
				Longtitude: 120,
			},
			EndPos: &trippb.Location{
				Latitude:   35,
				Longtitude: 115,
			},
			PathLocation: []*trippb.Location{
				{
					Latitude:   31,
					Longtitude: 119,
				},
				{
					Latitude:   32,
					Longtitude: 118,
				},
			},
			Status: trippb.Status_CONNECTING,
		},
	}, nil
}
