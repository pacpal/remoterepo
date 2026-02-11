package hello

import (
	trippb "coolcar/proto/gen/go"
	"encoding/json"
	"fmt"

	"google.golang.org/protobuf/proto"
)

func hello() {
	trip := trippb.Trip{
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
	}
	fmt.Println(&trip)

	b, err := proto.Marshal(&trip)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%X\n", b)
	var trip2 trippb.Trip
	err = proto.Unmarshal(b, &trip2)
	if err != nil {
		panic(err)
	}
	fmt.Println(&trip2)
	b, err = json.Marshal(&trip)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", b)
}
