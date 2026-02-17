package main

import (
	"bytes"
	"context"
	authpb "coolcar/auth/api/gen/v2"
	"io"
	"log"
	"net/http"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/encoding/protojson"
)

func main() {
	c := context.Background()
	c, cancel := context.WithCancel(c)
	defer cancel()

	mux := runtime.NewServeMux(runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.JSONPb{
		MarshalOptions: protojson.MarshalOptions{
			UseEnumNumbers: true, // 对应原来的 EnumsAsInts: true
			UseProtoNames:  true, // 对应原来的 OrigName: true
			// EmitUnpopulated: true, // 如果你需要输出默认值（比如空的 string 或 0），建议加上这个，对应原来的 EmitDefaults
		},
		// 如果你有反序列化（请求接收）的特殊配置，可以配置 UnmarshalOptions
		// UnmarshalOptions: protojson.UnmarshalOptions{
		//     DiscardUnknown: true,
		// },
	},
	))

	// ← 插入这5行！
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		body, _ := io.ReadAll(r.Body)
		r.Body = io.NopCloser(bytes.NewReader(body))
		log.Printf("🌐 HTTP %s %s | Body: %s", r.Method, r.URL.Path, string(body))
		mux.ServeHTTP(w, r)
	})

	log.Fatal(http.ListenAndServe(":8080", nil)) // 注意：传 nil，用上面的 HandleFunc

	err := authpb.RegisterAuthServiceHandlerFromEndpoint(c, mux, "localhost:8081", []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())})
	if err != nil {
		log.Fatalf("Cannot register auth service:%v", err)
	}
	log.Fatal(http.ListenAndServe(":8080", mux))
}
