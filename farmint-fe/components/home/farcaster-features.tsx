"use client";

import { Share2, Heart, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Animated } from "@/components/ui/animated";
import { useMiniAppContext } from "@/components/miniapp/miniapp-provider";
import { toast } from "sonner";

export function FarcasterFeatures() {
  const { actions, isInMiniApp } = useMiniAppContext();

  const handleShareToFarcaster = async () => {
    if (!isInMiniApp) {
      toast.info("Share feature available in Farcaster app");
      return;
    }

    try {
      await actions.composeCast({
        text: "🎨 Just discovered some amazing NFTs on FarTrade! The easiest way to trade NFTs on Farcaster 🔥",
        embeds: [window.location.href]
      });
    } catch (error) {
      toast.error("Failed to share to Farcaster");
    }
  };

  const handleDiscoverTrending = () => {
    // Simulate discovering trending NFTs from Farcaster community
    toast.success("🔥 Found 12 trending NFTs from your Farcaster network!");
  };

  const features = [
    {
      icon: Share2,
      title: "Share Your Trades",
      description: "Show off your NFT purchases to your Farcaster followers",
      action: handleShareToFarcaster,
      buttonText: "Share Now",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Sparkles,
      title: "Discover Trending",
      description: "Find NFTs trending in your Farcaster community",
      action: handleDiscoverTrending,
      buttonText: "Discover",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
          <MessageCircle className="h-5 w-5 text-purple-400" />
        </div>
        <h2 className="text-heading-h3 font-heading font-bold">Farcaster Features</h2>
      </div>

      <div className="grid gap-4">
        {features.map((feature, index) => (
          <Animated
            key={feature.title}
            animation="slideUp"
            delay={index * 150}
            className="relative overflow-hidden rounded-xl border border-border-medium bg-background-card hover:border-primary-500/30 smooth-120 hover:scale-102 hover:shadow-glow-md"
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-5`} />
            
            <div className="relative p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.gradient} bg-opacity-20`}>
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-heading-h5">{feature.title}</h3>
                  </div>
                  
                  <p className="text-body-sm text-text-secondary mb-4">
                    {feature.description}
                  </p>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={feature.action}
                    className="button-smooth hover:scale-105 hover:shadow-glow-sm border-primary-500/30 hover:border-primary-500 hover:bg-primary-600/10"
                  >
                    <span className="smooth-120">{feature.buttonText}</span>
                  </Button>
                </div>
              </div>
            </div>
          </Animated>
        ))}
      </div>

      {/* Social proof */}
      <Animated
        animation="fadeIn"
        delay={300}
        className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background-secondary/50 border border-border-light"
      >
        <Heart className="h-4 w-4 text-red-400" />
        <span className="text-body-sm text-text-secondary">
          Loved by <span className="font-semibold text-primary-400">2.4K+</span> Farcaster users
        </span>
      </Animated>
    </section>
  );
}
