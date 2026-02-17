// Package auth 用户认证相关内容
package auth

import (
	"context"
	authpb "coolcar/auth/api/gen/v2"
	"log"

	zap "go.uber.org/zap"
)

// Service implements auth service
type Service struct {
	Logger *zap.Logger
	authpb.UnimplementedAuthServiceServer
}

// Login logs a user in
func (s *Service) Login(c context.Context, req *authpb.LoginRequest) (*authpb.LoginResponse, error) {
	log.Printf("📥 gRPC REQ: %+v", req) // ← 就这行！
	s.Logger.Info("received code", zap.String("code", req.Code))
	return &authpb.LoginResponse{
		AccessToken: "token for " + req.Code, ExpiresIn: 7200}, nil
}
